const { systemMessageColors } = require('../config/chatConfig')
const chatController = require('../controllers/chatController')
const { addUser, deleteUser, getUsername, generateUsername, isUsernameValid } = require('../state/onlineUsers')

const registerChatHandlers = (socket, io) => {

  socket.on('client ready', async (username) => {
    // validity obj are like this { isValid, reason, username }
    const usernameValidityObject = isUsernameValid(username) 
    //check if the username stored in local storage of the user trying to connect is valid
    //if not valid, send a person system message back telling them the reason, a reminder
    // that /nick changes username, and assign them a temporary randomized valid username. 
    if(!usernameValidityObject.isValid){
      //generate  temporary username for this dingus
      const randomTemporaryUsername = generateUsername()
      //emit the event to the frontend so change in username reflected there
      socket.emit("change username", randomTemporaryUsername)
      //save rando username
      addUser(socket.id, randomTemporaryUsername)
      //load chat history
      const messages = await chatController.getRecentMessages()
      socket.emit('load history', messages)
      //display the standard welcome message
      socket.emit('system message', {
        username: 'system', 
        text: '***hai and welcome to my chat :3 type /commands for a list of chat commands<3***',
        color: systemMessageColors.system
      })
      //and emit a personal system message
      socket.emit('system message', {
        username: 'system',
        text: `${usernameValidityObject.reason}. a temporary name has been assigned for u! you can change it with /nick`,
        color: systemMessageColors.error
      })
    }
    else{
      //add user to onlineUsers dictionary
      const cleanedUpUsername = usernameValidityObject.username
      addUser(socket.id, cleanedUpUsername)
      //load chat history
      const messages = await chatController.getRecentMessages()
      socket.emit('load history', messages)
      //display the welcome message
      socket.emit('system message', {
        username: 'system', 
        text: '***hai and welcome to my chat :3 type /commands for a list of chat commands<3***',
        color: systemMessageColors.system
      })
    }
  })

socket.on('chat message', async (msg) => {
  console.log('New message from frontend:', msg)
  //double check socket.id exists
  if(!getUsername(socket.id)){
    // error feedback
    socket.emit('system message', {
      username: 'system',
      text: 'connection hiccup T-T - refresh to keep chatting!',
      color: systemMessageColors.systemPersonal
    })
  }

  // handle COMMANDS
  if (msg.text.startsWith('/')) {
    await chatController.handleChatCommand(msg, socket, io)
  } 
  // handle normal messages
  else {
    await chatController.processMessage({
      username: getUsername(socket.id),
      text: msg.text,
      color: systemMessageColors.defaultUser,
      type: 'user'
    }, io)
  }
})

  socket.on('user connect', async () => {
    //add user to onlineUsers
    //send chat history to the frontend
    const messages = await chatController.getRecentMessages()
    const payload = { messages }
    io.emit('user connect', payload)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    //delete the user from onlineUsers dict
    deleteUser(socket.id)
  })

}

module.exports = { registerChatHandlers }