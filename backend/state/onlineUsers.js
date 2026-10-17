
const { reservedUsernames, USERNAME_MAX_SIZE, USERNAME_MIN_SIZE } = require('../config/chatConfig')

const onlineUsers = new Map()

//onlineUsers stores users as they enter chat and keeps it updated with these
//functions. it looks like:
////   onlineUsers: {
////////               <some_socketId>: {username: <some_username>,
////////                                 joinedAt: <some_timestamp>}
////                }

function addUser(socketId, username){
    console.log('omg bestie new userrr. here\'s onlineUsers: ', onlineUsers)
    onlineUsers.set(socketId, { username, joinedAt: Date.now()})
}

function deleteUser(socketId){
    onlineUsers.delete(socketId)
}

function getUsername(socketId){
    return onlineUsers.get(socketId)?.username
}

function generateUsername(){
      const rand = Math.floor(Math.random() * 1000)
      const time = Date.now().toString().slice(-4)
      return `User${rand}${time}`
}

function getSocketId(username){
    for(const [id, user] of onlineUsers.entries()){
        if (user.username.toLowerCase() === username.toLowerCase()){
            return id
        }
    }
    return null
}

function getAllUsers(){
    return Array.from(onlineUsers.values()).map(u => u.username)
}

function usernameExists(usernameToCheck){
    for(const user of onlineUsers.values()){
        if(user.username.toLowerCase() === usernameToCheck.toLowerCase()){
            return true
        }
    }
    return false
}

//returns a validation object upon checking validity of username
//{ isValid: bool, reason: 'some reason that can be displayed to user' }
function isUsernameValid(username){
    //check that username is acually a string
    if(typeof username !== 'string') return {isValid: false, reason: 'username must be string', username: null}
    //trim white space and make lower case for comparisons
    const formatted = username.toLowerCase().trim()
    //check valid length
    if(formatted.length > USERNAME_MAX_SIZE || formatted.length < USERNAME_MIN_SIZE) return {isValid: false, reason: `username length must be between ${USERNAME_MIN_SIZE} and ${USERNAME_MAX_SIZE}`, username: null}
    //check if name already exists
    if(usernameExists(formatted)) return {isValid: false, reason: 'that username is already taken', username: null}
    //check if username is reserved name
    if(reservedUsernames.includes(formatted)){
        return {isValid: false, reason: 'username is reserved', username: null}
    }
    //aaaaand if it is actually valid return the trimmed but not lowercased version
    return {isValid: true, reason: null, username: username.trim()}
}

module.exports = {
    onlineUsers,
    addUser,
    deleteUser,
    getUsername,
    getSocketId,
    getAllUsers,
    usernameExists,
    isUsernameValid,
    generateUsername
}