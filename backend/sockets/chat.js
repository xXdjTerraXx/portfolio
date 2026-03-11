const chatController = require('../controllers/chatController')

const registerChatHandlers = (socket, io) => {

  socket.on('client ready', async () => {
    const messages = await chatController.getRecentMessages()

    socket.emit('load history', messages)

    socket.emit('system message', {
      text: '***hai and welcome to my chat :3 type /name username to set \
      ur display name! /commands for a list of commands<3***'
    })
  })

  socket.on('chat message', async (msg) => {
    console.log('New message from frontend:', msg)
    const newMessage = await chatController.saveMessage(msg)
    io.emit('chat message', newMessage)
  })

  socket.on('user connect', async () => {
    const messages = await chatController.getRecentMessages()
    const payload = { messages }
    io.emit('user connect', payload)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  })

}

module.exports = { registerChatHandlers }