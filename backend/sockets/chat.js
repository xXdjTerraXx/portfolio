const { systemMessageColors } = require('../config/chatConfig')
const chatController = require('../controllers/chatController')
const { addUser, deleteUser } = require('../state/onlineUsers')

const registerChatHandlers = (socket, io) => {

  socket.on('client ready', async (username) => {
    
    //add user to onlineUsers dictionary
    addUser(socket.id, username)

    const messages = await chatController.getRecentMessages()

    socket.emit('load history', messages)

    socket.emit('system message', {
      user: 'system', 
      text: '***hai and welcome to my chat :3 type /commands for a list of chat commands<3***',
      color: systemMessageColors.system
    })
  })

  socket.on('chat message', async (msg) => {
    console.log('New message from frontend:', msg)
    
    //handle chat COMMANDS
    if (msg.text.startsWith('/')){
      chatController.handleChatCommand(msg, socket, io)
    }
    //handle chat MESSAGES
    else {
      const newMessage = await chatController.saveMessage(msg)
      newMessage.color = systemMessageColors.defaultUser
      io.emit('chat message', newMessage)
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