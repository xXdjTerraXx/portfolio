//just for keeping all the system chat messages all standardized
const systemMessageColors = {
    system: '#6fff00',
    systemPersonal: '#00ffd5',
    whisper: '#aa00ff',
    error: '#ff4141',
    joinAndLeave: '#00aaff',
    emote: '#b1b1b1',
    defaultUser: '#ededed',
    discordMessage: '#ffac1d',
    discordMessageTerra: '#fac58d'
}

const chatCommands = {
  nick: {
    usage: "/nick <username>",
    description: "change username"
  },

  w: {
    usage: "/w <username> <message>",
    description: "whisper to a user"
  },

  discord: {
    usage: "/discord <message>",
    description: "send terra a discord message"
  },

  who: {
    usage: "/who <username>",
    description: "show user status"
  },

  users: {
    usage: "/users",
    description: "show chat user list"
  },

  me: {
    usage: "/me <action>",
    description: "show an emote message"
  }
}

const CHAT_MESSAGE_MAX_SIZE = 400
const USERNAME_MAX_SIZE = 18
const CHAT_HISTORY_LIMIT = 50

module.exports = {
    systemMessageColors,
    chatCommands,
    CHAT_MESSAGE_MAX_SIZE,
    USERNAME_MAX_SIZE,
    CHAT_HISTORY_LIMIT 
}