import './styles/style.css'
import DesktopScene from "./modules/scenes/DesktopScene"
import RoomScene from "./modules/scenes/RoomScene"
import StateManager from "./modules/base_classes/StateManager"
import { formatTimestamp, importAll, timeAgo } from "./utils.js"
import * as PIXI from 'pixi.js'
import { roomSceneManifest, loadAssets, pngImages } from './image_imports.js'
import * as TWEEN from "@tweenjs/tween.js"
import { Howl, Howler } from 'howler';
import ChatWindow from './modules/windows/Chat.js'
import PixelLinksIcon from './img/icons/links.png'
import PixelLoveIcon from './img/icons/love.png'
import PixelWindowIcon from './img/icons/heart_window.png'
import PixelMusicIcon from './img/icons/music.png'
import './westieCursor.js'
import RoomSound from './sounds/room_noise.mp3'
import RainSound from './sounds/rain.mp3'
import FouramNostalgia from './sounds/4am nostalgia.mp3'
import ElevenAmLight from './sounds/11am.mp3'
import ThreePmRain from './sounds/4pm rain.mp3'
import SixPmDistress from './sounds/6pm distress.mp3'
import TenPmWishful from './sounds/wishful.mp3'
import LiveBlinkerGif from './img/gif/live_blinker.gif'
import GreyCircle from './img/png/grey_circle.png'
import SocialIconGithub from './img/icons/socials/github.png'
import SocialIconInstagram from './img/icons/socials/instagram.png'
import SocialIconSoundcloud from './img/icons/socials/soundcloud.png'
import SocialIconYoutube from './img/icons/socials/youtube.png'
import SocialIconDiscord from './img/icons/socials/discord.png'



//preload all audio
const sounds = {
    RoomSound: {audio: new Howl({ src: [RoomSound]}), title: 'room sound'},
    RainSound: {audio: new Howl({src: [RainSound]}), title: 'rain sound'},
    FouramNostalgia: {audio: new Howl({src: [FouramNostalgia]}), title: '4 am [nostalgia]'},
    ElevenAmLight: {audio: new Howl({src: [ElevenAmLight]}), title: '11 am [light]'},
    ThreePmRain: {audio: new Howl({src: [ThreePmRain]}), title: '3 pm [searching 4 u]'},
    SixPmDistress: {audio: new Howl({src: [SixPmDistress]}), title: '6 pm [distress]'},
    TenPmWishful: {audio: new Howl({src: [TenPmWishful]}), title: '10 pm [wishful]'}
}

function preloadSound(sound){
    return new Promise((resolve, reject) => {
        sound.once('load', resolve)
        sound.once('loaderror', (id, error) => reject(error))
    })
}

async function preloadAllSounds(sounds) {
    try {
        const loadPromises = Object.values(sounds).map(preloadSound);
        await Promise.all(loadPromises);
        console.log('all sounds are loaded');
    } catch (error) {
        console.error('error loading sounds dog T-T:', error);
    }
}

//fetch presence and discord status as one "presenceObject"
async function getOnlineStatus() {
    //this function calls fetchPresence and fetchDiscordStatus and puts both return values
    //in an onlineStatusObject that is passed to the main application on init

    //first declare some variables, defaulting to offline :3
    let onlineStatusObject = { 
        isOnline: false, 
        presenceStateObject: null, 
        discordStateObject: null
    }
    try{
        //no need to get any discord info if presence is "offline", so check that first
        onlineStatusObject.presenceStateObject = await fetchPresence()
        onlineStatusObject.isOnline = onlineStatusObject.presenceStateObject.status !== "offline"
        //if presence is "offline" just return the onlineStatusObject w default values
        if(!onlineStatusObject.isOnline){
            let { username } = await fetchDiscordStatus()
            onlineStatusObject.isOnline = false
            onlineStatusObject.discordStateObject = {isOnline: false, username }
           
            return onlineStatusObject
        }
        //otherwise, get discord state yaaay!
        else {
            onlineStatusObject.discordStateObject = await fetchDiscordStatus()
            return onlineStatusObject
        }
    }
    catch(err){
        console.error(`${err.name} - oh no gorl something went wrong fetching the presence T-T: ${err.message}`)
        return onlineStatusObject
    }
}

async function fetchPresence() {
    console.log('fetching presence data...')
    try{
        let url = `${process.env.API_BASE_URL}/presence`
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`yooo http error! something went wrong fetching presence: ${response.status}`)
        }
        const json = await response.json()
        console.log('presence json from fetchPresence: ', json)
        return json
    }
    catch(err){
        return err
    }
}

async function fetchDiscordStatus() {
    return { isOnline: true, username: 'xxdjTerraxx'}
}

//fetch weather
async function getWeather () {
    console.log('fetching weather data...')
    console.log('DEBUG: NODE_ENV is:', process.env.NODE_ENV)
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
            },
        mode: "cors", 
    }
    let url = `${process.env.API_BASE_URL}/weather`
    const response = await fetch(url)
    if(!response.ok){
            throw new Error(`http error! yoo something went wrong fetching weather: ${response.status}`)
        }
    const json = await response.json()
    console.log('weather json: ', json)
    return json
    // const APIKEY = await APIKEYRESPONSE.json() 
}

//fetch last song listened to
async function getLastFM(){
    console.log('fetching lastfm data...')
    let url = `${process.env.API_BASE_URL}/lastfm`
    const response = await fetch(url)
    if(!response.ok){
        throw new Error(`yooo http error!something went wrong fetching lastfm: ${response.status}`)
    }
    const json = await response.json()
    console.log('last fm data fetched successfully! ', json)
    const returnedJson = json.lastPlayed
    return returnedJson
}

//fetch post it notes for notes board
async function getNotes(){
    console.log('fetching notes...')
    try{
        let url = `${process.env.API_BASE_URL}/notes`
        console.log('EHY KIKD IMA COMPUTER: ', url)
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`yooo http error! somethig went wrong getting the notes: ${response.status}`,)
        }
        const json = await response.json()
        console.log('notes json: ', json)
        return json
    }
    catch(err){
        console.log("error fetching notes T-T:", err)
        return err
    }
}

//personal status is like a custom tweet thing bc twitter api is gay
async function getPersonalStatus(){
    console.log('fetching personal status...')
    try{
        let url = `${process.env.API_BASE_URL}/personal_status`
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`yooo http error! somethig went wrong getting personal status: ${response.status}`,)
        }
        const json = await response.json()
        console.log('personal status json: ', json)
        return json
    }
    catch(err){
        console.log("error fetching personal status T-T:", err)
        return err
    }
}

//get personal mood
async function getMood(){
    console.log('fetching mood...')
    try{
        let url = `${process.env.API_BASE_URL}/moods/get_all`
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`yooo http error! somethig went wrong getting mood: ${response.status}`,)
        }
        const json = await response.json()
        console.log('moods json: ', json)
        return json
    }
    catch(err){
        console.log("error fetching moods T-T:", err)
        return err
    }
}

//create the ambient room sound audio
function createAudio(){
    const audio = new Audio(RoomSound)
    
    // autoplay the audio
    audio.autoplay = true
    audio.loop = true // loop the audio
    
    // append audio element to the body
    document.body.appendChild(audio)
    console.log('audio set up!', audio.src)
}

window.onload = async () => {
    
    const lastPlayedJson = await getLastFM()
    const weatherJson = await getWeather()
    const onlineStatus = await getOnlineStatus()
    const personalStatus = await getPersonalStatus()
    const notesArray = await getNotes()
    const mood = await getMood()
    console.log("DEBUG: onlineStatus: ", onlineStatus)
    // const tweet = await getTweet()
    await preloadAllSounds()
    // sounds.RainSound.play()
    // sounds.RoomSound.play()
    sounds.RainSound.audio.loop()
    sounds.RoomSound.audio.loop()
    const mainOutsideContainerLeft = document.createElement('div')
    document.body.append(mainOutsideContainerLeft)
    const aboutWindow= new AboutWindow()
    const statusWindow = new PersonalStatusWindow(personalStatus)
    const musicWindow = new LastPlayedWindow()
    const chatWindow = new ChatWindow()
    const linksWindow = new LinksWindow()
    mainOutsideContainerLeft.classList.add("main-outside-container")
    
    aboutWindow.init()
    statusWindow.init()
    musicWindow.init(lastPlayedJson)
    
    createAudio()
    const application = new Application()
    await application.init(onlineStatus, weatherJson, lastPlayedJson, sounds, personalStatus, notesArray, mood)
    const mainOutsideContainerRight = document.createElement('div')
    mainOutsideContainerRight.classList.add('main-outside-container')
    document.body.append(mainOutsideContainerRight)
    chatWindow.init(mainOutsideContainerRight)
    linksWindow.init(mainOutsideContainerRight)
}


class BaseWindow {
    constructor({ iconSrc, titleText, containerClass, titleClass }) {
        this.icon = new Image()
        this.icon.src = iconSrc

        this.containerDiv = document.createElement('div')
        this.titleContainerDiv = document.createElement('div')
        this.title = document.createElement('h3')
        this.bodyContainerDiv = document.createElement('div')

        this.titleText = titleText
        this.containerClass = containerClass
        this.titleClass = titleClass
    }

    setupBase() {
        this.icon.classList.add("small-icon")

        this.containerDiv.classList.add(this.containerClass, "section-container")
        this.title.classList.add(this.titleClass, "section-title")

        this.title.textContent = this.titleText

        this.titleContainerDiv.append(this.icon, this.title)
        this.containerDiv.append(this.titleContainerDiv, this.bodyContainerDiv)
    }

    mount(parent = document.querySelector(".main-outside-container")) {
        parent.append(this.containerDiv)
    }
}

class AboutWindow extends BaseWindow {
    constructor() {
        super({
            iconSrc: PixelLoveIcon,
            titleText: "Welcome to terra.dev!",
            containerClass: "about-container",
            titleClass: "about-title"
        })

        this.bodyParagraph = document.createElement('p')
    }

    init() {
        this.setupBase()

        this.titleContainerDiv.classList.add("about-title-container-div")
        this.bodyContainerDiv.classList.add("about-body-container-div")
        this.bodyParagraph.classList.add("about-body-paragraph")

        this.bodyParagraph.textContent = `hi im terra and welcome to my cozy web den ^-^
it's still very much a work in progress so keep coming back!
i'll have more stuff as time goes on :3`

        this.bodyContainerDiv.append(this.bodyParagraph)

        this.mount()
    }
}

class PersonalStatusWindow extends BaseWindow {
    constructor(personalStatus) {
        super({
            iconSrc: PixelWindowIcon,
            titleText: "current status",
            containerClass: "status-container",
            titleClass: "status-title"
        })

        this.personalStatus = personalStatus

        this.bodyParagraph = document.createElement('p')
        this.timeStampDiv = document.createElement('div')
        this.dateStampText = document.createElement('p')
    }

    init() {
        this.setupBase()

        this.titleContainerDiv.classList.add("status-title-container-div")
        this.bodyContainerDiv.classList.add("status-body-container-div")

        this.bodyParagraph.classList.add("status-body-paragraph")
        this.timeStampDiv.classList.add("status-timestamp-container")
        this.dateStampText.classList.add("status-datestamp-text")

        this.bodyParagraph.textContent = this.personalStatus.text
        this.dateStampText.textContent = formatTimestamp(this.personalStatus.created_at)

        this.timeStampDiv.append(this.dateStampText)
        this.bodyContainerDiv.append(this.bodyParagraph)

        this.containerDiv.append(this.timeStampDiv)

        this.mount()
    }
}

class LastPlayedWindow extends BaseWindow {
    constructor() {
        super({
            iconSrc: PixelMusicIcon,
            titleText: "last song",
            containerClass: "music-container",
            titleClass: "music-title"
        })

        this.bodyParagraph = document.createElement('h5')
        this.bodyParagraphAgo = document.createElement('p')
        this.blinkerContainer = document.createElement('div')
        this.timeAgoContainer = document.createElement('div')
    }

    init(lastPlayed) {
        this.setupBase()

        this.titleContainerDiv.classList.add("music-title-container-div")
        this.bodyContainerDiv.classList.add("music-body-container-div")

        this.bodyParagraph.classList.add("music-body-paragraph")
        this.bodyParagraphAgo.classList.add("music-body-paragraph")

        const blinker = new Image()
        blinker.src = lastPlayed.playedAgo === 'Currently Playing'
            ? LiveBlinkerGif
            : GreyCircle
        blinker.classList.add("live-blinker")

        this.bodyParagraph.textContent = `${lastPlayed.artistName} - ${lastPlayed.songTitle}`
        this.bodyParagraphAgo.textContent = lastPlayed.playedAgo

        this.blinkerContainer.append(blinker)
        this.timeAgoContainer.append(this.bodyParagraphAgo)

        this.bodyContainerDiv.append(this.bodyParagraph, this.blinkerContainer)
        this.containerDiv.append(this.timeAgoContainer)

        this.mount()
    }
}

class LinksWindow extends BaseWindow {
    constructor() {
        super({
            iconSrc: PixelLinksIcon,
            titleText: "Links",
            containerClass: "links-container",
            titleClass: "links-title"
        })

        this.socialsList = document.createElement('ul')

        this.socialsArray = [
            {labelText: 'discord', url: '#', iconImageSource: SocialIconDiscord},
            {labelText: 'instagram', url: '#', iconImageSource: SocialIconInstagram},
            {labelText: 'github', url: '#', iconImageSource: SocialIconGithub},
            {labelText: 'soundcloud', url: '#', iconImageSource: SocialIconSoundcloud},
            {labelText: 'youtube', url: '#', iconImageSource: SocialIconYoutube},
        ]
    }

    init(parentDiv) {
        this.setupBase()

        this.titleContainerDiv.classList.add("links-title-container-div")
        this.bodyContainerDiv.classList.add("links-body-container-div")
        this.socialsList.classList.add("socials-list")

        this.socialsArray.forEach(social => {
            new SocialLinkSection({
                ulElement: this.socialsList,
                ...social
            }).init()
        })

        this.bodyContainerDiv.append(this.socialsList)

        this.mount(parentDiv)
    }
}

class SocialLinkSection{
    constructor({ ulElement, iconImageSource, labelText, url }){
        this.parentElement = ulElement
        this.li = document.createElement('li')
        this.containerDiv = document.createElement('div')
        this.icon = new Image()
        this.iconImageSource = iconImageSource
        this.linkElement = document.createElement('a')
        this.labelText = labelText
        this.linkUrl = url
    }

    init = () => {
        this.icon.src = this.iconImageSource
        this.icon.alt = `${this.labelText} icon`
        this.containerDiv.classList.add("social-link-section-container")
        this.icon.classList.add('social-icon')
        this.linkElement.classList.add('social-link')
        this.linkElement.textContent = this.labelText
        this.linkElement.setAttribute('href', `${this.linkUrl}`)

        this.linkElement.target = "_blank"
        this.linkElement.rel = "noopener noreferrer"

        this.containerDiv.append(this.icon, this.linkElement)
        this.li.append(this.containerDiv)
        this.parentElement.append(this.li)
    }
}

export default class Application{
    constructor(){
        this.app = new PIXI.Application()
        this.ticker = PIXI.Ticker.shared
        //enable pixijs chrome dev tool
        globalThis.__PIXI_APP__ = this.app
    }

    init = async (onlineStatusObject, weatherJson, lastPlayedJson, soundsObject, personalStatus, notesArray, mood) => {
        try {
            await this.app.init({ width: 800, height: 600, preference:'webgl' });
            document.body.append(this.app.canvas)
            PIXI.Assets.init({manifest: roomSceneManifest})
            // PIXI.Assets.backgroundLoadBundle(['png', 'sprite_sheets']);
            // const assets = await PIXI.Assets.loadBundle('png');
            this.soundsObject = soundsObject
            this.assets = await PIXI.Assets.loadBundle('png');
            this.sprite_sheets = await PIXI.Assets.loadBundle('sprite_sheets')
            this.icons = await PIXI.Assets.loadBundle('icons')
            this.weatherIcons = await PIXI.Assets.loadBundle('weather_icons')
            this.fonts = await PIXI.Assets.loadBundle('fonts')
            this.stateManager = new StateManager('room_scene')
            this.currentState = this.stateManager.currentState

            this.onlineStatusObject = onlineStatusObject
            this.personalStatus = personalStatus
            this.notesArray = notesArray
            this.mood = mood

            this.roomScene = new RoomScene(this.app, this.set_state, this.assets, this.sprite_sheets, this.fonts, this.onlineStatusObject, this.icons, weatherJson, this.weatherIcons, lastPlayedJson, this.soundsObject, this.personalStatus, this.notesArray, this.mood)
            this.desktopScene = new DesktopScene(this.app, this.set_state, this.assets, this.sprite_sheets)

            this.statesObject = {
                room_scene: this.roomScene,
                desktop_scene: this.desktopScene
            }

            await this.statesObject[this.currentState].initializeAssets()
            
            this.ticker.add(delta => this.mainLoop(delta))
            
            // Access resources here
        } catch (error) {
            console.error("Error initializing assets:", error);
        }
    }

    mainLoop = (delta) => {
        //all the tweens have to be updated here
        TWEEN.update()

        this.statesObject[this.currentState].run(delta)

    }
}