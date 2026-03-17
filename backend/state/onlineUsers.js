
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
    return onlineUsers.get(socketId).username
}

function getSocketId(username){
    for(const [id, user] of onlineUsers.entries()){
        if (user.username === username){
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
        if(user.username === usernameToCheck){
            return true
        }
    }
    return false
}

module.exports = {
    onlineUsers,
    addUser,
    deleteUser,
    getUsername,
    getSocketId,
    getAllUsers,
    usernameExists
}