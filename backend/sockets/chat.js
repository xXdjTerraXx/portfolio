const registerChatHandlers = (socket, io) => {
  socket.on('chat message', (msg) => {
    console.log('New message:', msg);
    io.emit('chat message', msg); // broadcast to everyone
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
};
console.log("this is it ya cheeky cunt", module.exports)
module.exports = { registerChatHandlers }