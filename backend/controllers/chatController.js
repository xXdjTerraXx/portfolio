const { systemMessageColors, chatCommands } = require('../config/chatConfig')
const supabase = require('../services/supabaseClient')
const { getUsername, getAllUsers, onlineUsers, getSocketId, addUser, usernameExists } = require('../state/onlineUsers')
const timeAgo = require('../utils/timeAgo')

exports.saveMessage = async function(message){
    const { username, text, user_ip } = message
    console.log('NEW MESSAGE WOO WOOP', message)

    const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      { username, text, user_ip }
    ])
    .select()

     if (error) {
        console.error("SUPABASE ERROR:", error)
        return
    }
    console.log('new message saved to db', data)

    return data[0]
}

exports.getRecentMessages = async function(){
    const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .limit(50)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: "Database error" })
  }

  return data
}

exports.handleChatCommand = function(messageObj, socket, io){
  //this is an array of all the cht commands from chat config. needed for when /commands is
  //entered so a list of all the chat commands can be displayed.config/chatConfug.chatCommands
  //is sourcce of truth for all chat commands
  const commandsMessagesList = Object.values(chatCommands).map(cmd =>`${cmd.usage} - ${cmd.description}`)
  //split the message to get the command
  const args = messageObj.text.split(" ")
  const command = args[0]
 
  
  switch(command){
    case "/nick":
      const olderUsername = getUsername(socket.id)
      const newUsername = args.slice(1).join("_")
      //handle if user omits a username
      if(!newUsername){
        socket.emit('system message', {
          user: 'system',
          text: `something went wrong. to change username: ${chatCommands.nick.usage}`,
          color: systemMessageColors.error
        })
        break
      }
      //check if username already taken
      if(usernameExists(newUsername)){
        socket.emit('system message', {
          user: 'system',
          text: 'nooo that name\'s already taken T-T',
          color: systemMessageColors.error
        })
        break
      }
      
      //update onlineUser
      addUser(socket.id, newUsername)
      //this event updates front end
      socket.emit('change username', newUsername)
      //emit the system message
      io.emit('system message', {
        user: 'system', text: `${olderUsername} changed name to ${newUsername}`, color: systemMessageColors.system
      })
      console.log("/nick command detected: ", newUsername)
      break

    case "/commands":
      socket.emit('system message', {
        user: 'system', 
        text: `***CHAT COMMANDS***
        ${commandsMessagesList.join('\n')}`, 
        color: systemMessageColors.systemPersonal
      })
      break

    case '/w':
      const targetUsername = args[1]
      const whisperText = args.slice(2).join(" ")
      
      //check for correct whisper formatting n stuff
      if (!targetUsername || !whisperText) {
        socket.emit('system message', {
          user: 'system',
          text: `aaah something went wrong. to whisper: ${chatCommands.w.usage}`,
          color: systemMessageColors.error
        })
        break
      }

      const targetSocketId = getSocketId(targetUsername)
      console.log(`*DEBUG* incoming whisper chat command: targetUsername: ${targetUsername}, targetSocketId ${targetSocketId}, whispe text: ${whisperText}`)
      //make sure that user existss
      if(!targetSocketId){
        socket.emit('system message', {
          user: 'system',
          text: '>_> that user doesnt appear to exist',
          color: systemMessageColors.error
        })
        break
      }

      const senderUsername = getUsername(socket.id)
      //send the message to the target
      io.to(targetSocketId).emit('whisper user', {
        username: `${senderUsername}`,
        text: `${whisperText}`,
        color: systemMessageColors.whisper,
        self: false,
        target: null
      })
      //show the sent whisper message in the senders chat ui too
      socket.emit('whisper user', {
        username: `${senderUsername}`,
        text: `${whisperText}`,
        color: systemMessageColors.whisper,
        self: true,
        target: targetUsername
      })
      break

    case '/users':
      const usersList = getAllUsers()
      socket.emit('system message', {
        user: 'system',
        text: `there are currently ${usersList.length} users in chat: ${usersList.join(', ')}`,
        color: systemMessageColors.systemPersonal
      })
      break

    case '/me':
      const emote = args.slice(1).join(" ")
      io.emit('system message', {
        user: 'system',
        text: `-- ${getUsername(socket.id)} ${emote} --`,
        color: systemMessageColors.emote
      })
      break

    case '/who':
      const targetUser = args[1]
      if (!targetUser){
        socket.emit('system message', {
          user: 'system',
          text: 'Usage: /who <username>',
          color: systemMessageColors.error
        })
        break
      }

      const targetUserSocketId = getSocketId(targetUser)
      if (!targetUserSocketId){
        socket.emit('system message', {
          user: 'system',
          text: `couldn't find user ${targetUser} T-T`,
          color: systemMessageColors.error
        })
        break
      }

      const userObj = onlineUsers.get(targetUserSocketId)
      if (!userObj){
        socket.emit('system message', {
          user: 'system',
          text: `something went wrong finding ${targetUser}`,
          color: systemMessageColors.error
        })
        break
      }

      const targetUserTimeInMs = Date.now() - userObj.joinedAt
      const readableTime = timeAgo(targetUserTimeInMs)
      socket.emit('system message', {
        user: 'system',
        text: `${targetUser} has been chilling for ${readableTime}`,
        color: systemMessageColors.systemPersonal
      })

      break

    default:
      break
  }
}