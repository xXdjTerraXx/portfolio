import socket from "../../socket"
import PixelChatIcon from '../../img/icons/chat.png'
import ChatSettingsIconTexture from '../../img/icons/chat_settings_icon.png'
import { setStyles } from "../../utils"

//class for frontend messages that display in the chat window
class Message {
    constructor(username, message, messageType, styleObj = null){
        this.username = username
        this.message = message
        this.messageType = messageType
        this.styleObj = styleObj

        this.container = document.createElement('div')
        this.container.classList.add('message-container')
        this.userNameText = document.createElement('p')
        this.userNameText.classList.add('chat-message-user-name', 'chat-message')
        this.messageParagraph = document.createElement('p')
        this.messageParagraph.classList.add('chat-message-text' ,'chat-message')
        if(this.messageType === 'system'){
          //change the font of system messages
          this.messageParagraph.id = 'system-message'
        }
        if(this.messageType === 'whisper'){
          //change the font of whisper messages
          this.messageParagraph.id = 'whisper-message'
        }
        if(styleObj){
          setStyles(this.messageParagraph, styleObj)
        }
        this.container.append(this.userNameText, this.messageParagraph)
        this.userNameText.textContent = this.username
        this.messageParagraph.textContent = message
    }
}

export default class ChatWindow{
    constructor(){
        this.socket = socket
        this.icon = new Image()
        this.icon.src = PixelChatIcon
        this.title = document.createElement('h3')
        //titleContainer holds the icon and the title
        this.titleContainerDiv = document.createElement('div')
        this.userNameContainer = document.createElement('div')
        //chatContainerDiv holds all the messages
        this.chatContainerDiv = document.createElement('div')
        this.inputBox = document.createElement('input')
        this.submitButton = document.createElement('button')
        //newMessageContainerDiv holds new message input and send button
        this.newMessageContainerDiv = document.createElement('div')
        //mainContainerDiv contains aeverything from the chat window
        this.mainContainerDiv = document.createElement('div')

        this.chatSettingsIcon = document.createElement('img')
        this.chatSettingsIcon.src = ChatSettingsIconTexture

        //a library of default styles for various system messages
        this.styleLibrary = {
          systemPurple: {color: '#8b2bfb'},
          systemGreen: {color: 'limegreen'}
        }
        
    }

    init = (parentDiv, messagesArray) =>{
        

        this.icon.classList.add("small-icon")
        this.titleContainerDiv.classList.add("about-title-container-div", "chat-title-container-div")
        this.userNameContainer.classList.add("username-container")
        this.mainContainerDiv.classList.add("about-container", "section-container")
        this.title.classList.add("about-title", "section-title")
        this.chatContainerDiv.classList.add("chat-container-div")
        this.chatSettingsIcon.classList.add("chat-settings-icon")

        //set up for the input box
        this.inputBox.setAttribute('type', 'text')
        this.inputBox.name = 'username' 
        this.inputBox.id = 'user-input'
        this.inputBox.placeholder = 'enter msg here :3'
        this.inputBox.classList.add("new-chat-message-input")
        this.submitButton.textContent = 'send!'
        this.submitButton.classList.add("send-message-button")
        this.newMessageContainerDiv.classList.add("new-message-container-div")

        this.mainContainerDiv.classList.add("about-body-container-div")

        this.initializeUserState()

        this.createUserNameSection()

        this.title.textContent = "Chat"
        
        this.titleContainerDiv.append(this.icon, this.title, this.userNameContainer)
        this.newMessageContainerDiv.append(this.inputBox, this.submitButton, this.chatSettingsIcon)
        this.mainContainerDiv.append(this.titleContainerDiv, this.chatContainerDiv, this.newMessageContainerDiv)
        parentDiv.append(this.mainContainerDiv)

        //add event to send msg on button click
        this.submitButton.addEventListener("click", () => this.sendMessage())
        //add event to send msg on 'enter' press
        this.inputBox.addEventListener("keydown", (e) => {
          if(e.key === 'Enter'){
            this.sendMessage()
          }
        })
        //register socket events
        this.registerSocketEvents()
    }

    initializeUserState = () => {
      //first check local storage to see if user has picked a name before
      const storedUserName = localStorage.getItem('username')
      //if no, generate random name and save to local storage
      if(!storedUserName){
        this.username = this.generateUsername()
        localStorage.setItem('username', this.username)
      }
      else this.username = storedUserName
      console.log('initial user status set, currently chatting as: ', this.username)
    }

    createUserNameSection = () => {
        this.userNameP = document.createElement('p')
        this.userNameP.classList.add('username-display')
        this.userNameP.textContent = `${this.username}`
        this.userNameContainer.append(this.userNameP)
    }

    setUsername = (newUsername) => {
      this.username = newUsername
      localStorage.setItem('username', this.username)
      console.log('newww usernaaaame: ', this.username)
      //now the name has to be reset soooo:
      //clear the userNameContainer div
      while (this.userNameContainer.firstChild){
        this.userNameContainer.removeChild(this.userNameContainer.firstChild)
      }
      //repaint the userNameContainer div with the new username displaying
      this.createUserNameSection()
    }

    generateUsername = () => {
      const rand = Math.floor(Math.random() * 1000)
      const time = Date.now().toString().slice(-4)
      return `User${rand}${time}`
}

    registerSocketEvents() {
      this.socket.on("welcome message", (msg) => {
        this.displayMessage(msg, 'user', this.styleLibrary.systemGreen)
      })

      this.socket.on("chat message", (msg) => {
        this.displayMessage(msg)
      })

      this.socket.on("load history", (messages) => {
        messages.forEach((msg) => this.displayMessage(msg))
      })

      this.socket.on("change username", (newUsername) => {
        this.setUsername(newUsername)
      })

      this.socket.on("whisper user", (whisperMsg) => {
        console.log("user /me message")
        this.displayWhisper(whisperMsg)
        
      })

      this.socket.on("discord message", (discordMsg) => {
        console.log("user sent discord message")
        this.displayWhisper(discordMsg)
      })

      this.socket.on("system message", (msg) => {
        this.displayMessage(msg)
      })

      //this for debuggin
      this.socket.onAny((event, ...args) => {
        console.log("DEBUG: Socket event:", event, args)
      })

      // tell server ready to receiveeeee
      this.socket.emit("client ready", this.username)
  }

  sendMessage() {
    const username = this.username
    const text = this.inputBox.value.trim()
    const messageObject = { username:username ?? null, text, user_ip: null }
    if (messageObject.text.length > 1) {
      this.socket.emit("chat message", messageObject)
      //reset input box
      this.inputBox.value = ""
    }
    console.log("chat message sent!: ", messageObject)
  }

  displayMessage(msg) {
    let messageType
    msg.username === 'system' ? 'system' : 'user'
    const messageElem = new Message(msg.username, msg.text, messageType, {color: msg.color})
    this.chatContainerDiv.appendChild(messageElem.container)
    this.chatContainerDiv.scrollTop = this.chatContainerDiv.scrollHeight
  }

  displayWhisper(whisperMsg){
    console.log("DEBUG WHISPER: ", whisperMsg)
    const message = new Message(whisperMsg.username, whisperMsg.text, 'whisper', {color: whisperMsg.color})
    this.chatContainerDiv.appendChild(message.container)
    this.chatContainerDiv.scrollTop = this.chatContainerDiv.scrollHeight
  }

}
