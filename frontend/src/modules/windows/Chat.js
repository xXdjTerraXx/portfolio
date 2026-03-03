import socket from "../../socket"
import PixelChatIcon from '../../img/icons/chat.png'

class Message {
    constructor(userName, message){
        this.userName = userName
        this.message = message
        this.container = document.createElement('div')
        this.container.classList.add('message-container')
        this.userName = document.createElement('h3')
        this.userName.classList.add('message-user-name')
        this.messageParagraph = document.createElement('p')
        this.messageParagraph.classList.add('message-paragraph')
        this.container.append(this.userName, this.messageParagraph)
        this.userName.textContent = userName
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
        //chatContainerDiv holds all the messages
        this.chatContainerDiv = document.createElement('div')
        this.inputBox = document.createElement('input')
        this.submitButton = document.createElement('button')
        //newMessageContainerDiv holds new message input and send button
        this.newMessageContainerDiv = document.createElement('div')
        //mainContainerDiv contains aeverything from the chat window
        this.mainContainerDiv = document.createElement('div')
    }

    init = (parentDiv, messagesArray) =>{

        this.icon.classList.add("small-icon")
        this.titleContainerDiv.classList.add("about-title-container-div")
        this.mainContainerDiv.classList.add("about-container", "section-container")
        this.title.classList.add("about-title", "section-title")
        this.chatContainerDiv.classList.add("chat-container-div")

        //set up for the input box
        this.inputBox.setAttribute('type', 'text')
        this.inputBox.name = 'username' 
        this.inputBox.id = 'user-input'
        this.inputBox.placeholder = 'enter msg here :3'
        this.inputBox.classList.add("new-message-input")
        this.submitButton.textContent = 'send!'
        this.submitButton.classList.add("send-message-button")
        this.newMessageContainerDiv.classList.add("new-message-container-div")

        this.mainContainerDiv.classList.add("about-body-container-div")

        this.title.textContent = "Chat"
        
        this.titleContainerDiv.append(this.icon, this.title)
        this.newMessageContainerDiv.append(this.inputBox, this.submitButton)
        this.mainContainerDiv.append(this.titleContainerDiv, this.chatContainerDiv, this.newMessageContainerDiv)
        parentDiv.append(this.mainContainerDiv)

        //add event to send msg button
        this.submitButton.addEventListener("click", () => this.sendMessage())

        //register socket events
        this.registerSocketEvents()
    }

    registerSocketEvents() {
    this.socket.on("chat message", (msg) => {
      this.displayMessage(msg)
    })

    this.socket.on("load history", (messages) => {
      messages.forEach((msg) => this.displayMessage(msg))
    })
  }

  sendMessage() {
    const message = this.inputBox.value.trim()
    if (message) {
      this.socket.emit("chat message", message)
      this.inputBox.value = ""
    }
    console.log("chat message sent!: ", message)
  }

  displayMessage(msg) {
    const messageElem = new Message("user123", msg)
    this.chatContainerDiv.appendChild(messageElem.container)
    this.chatContainerDiv.scrollTop = this.chatContainerDiv.scrollHeight
  }

}
