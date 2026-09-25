import '../../styles/album_style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import dipcanUrl from '../../models/dipcan.glb'
import BGVideo from '../../video/bg_video.mp4'
import SigilLogo from '../../img/album/sigil_deer.png'
import CoverAndDisc from '../../img/album/cover_and_cd.png'
import DJTerraRealTree from '../../img/album/real_tree_dj_terra.png'
import BarbedWire from '../../img/album/barbed.png'
import Chain from '../../img/album/chain.png'
import TireMud1 from '../../img/album/tired_mud1.jpg'
import DirtRoad from '../../img/album/dirt_cloud.png'
import AnimeAngel from '../../img/album/anime_angel.png'
import WaffleHouse from '../../img/album/waffle_house.png'
import TireBG from '../../img/album/tire_bg.png'
import SocialIconIG from '../../img/album/icon_ig.png'
import SocialIconSC from '../../img/album/icon_sc.png'
import SocialIconYT from '../../img/album/icon_yt.png'
import HeartReticle from '../../img/album/heart_reticle.png'
import SkullSticker from '../../img/album/skull_crossbones_sticker.gif'
import BuschLight from '../../img/album/busch.png'
import ButterflySticker from '../../img/album/butterfly_sticker.gif'
import ButterflySticker2 from '../../img/album/butterfly_sticker2.gif'
import SparkleCross from '../../img/album/sparkle_cross.gif'
import RedneckSticker from '../../img/album/redneck_sticker.gif'
import WarningSticker from '../../img/album/rotating_warning.gif'
import StreamingBlinky from '../../img/album/streaming_blinky.gif'
import FruitigerMetroBorder from '../../img/album/border.png'
import AboutMeBlockImage from '../../img/album/links_block.png'
import { createImageElement, createNewElement } from '../../utils'

//SETUP
const linksArray = [
    {url: 'http://www.instagram.com/xxdjterraxx', label: "insta", icon: SocialIconIG },
    {url: 'http://www.soundcloud.com/xxdjterraxx', label: "sc", icon: SocialIconSC },
    {url: 'https://www.youtube.com/@xxdjterraxx', label: "yt", icon: SocialIconYT },
]

const albumBody = document.querySelector("body")

//background video
const canVideo = document.createElement('video')
canVideo.src = BGVideo 
canVideo.autoplay = true
canVideo.loop = true
canVideo.muted = true
canVideo.playsInline = true 
canVideo.classList.add("background-video")
albumBody.appendChild(canVideo) 



//HEADER DIV
const headerDiv = document.createElement("dv")
const headerText = document.createElement("h5")
const skullSticker1 = document.createElement("img")
const skullSticker2 = document.createElement("img")
headerDiv.classList.add("content-section", "header-div")
headerText.classList.add("header-text", "rainbow-animated")
headerText.textContent = "SOUTHERN IMMORTALITY ONLINE"
skullSticker1.classList.add("skull-sticker", "sticker")
skullSticker1.src = SkullSticker
skullSticker2.classList.add("skull-sticker", "sticker")
skullSticker2.src = SkullSticker
headerDiv.append(skullSticker1, headerText, skullSticker2)
albumBody.append(headerDiv)

//LOGOS SECTION
const logosDiv = document.createElement("div")
logosDiv.classList.add("content-section", "logo-div")
const sigilLogo = createImageElement(SigilLogo, ["sigil-logo"], logosDiv)
const textLogo = createImageElement(DJTerraRealTree, ["text-logo"], logosDiv)
albumBody.append(logosDiv)

//STREAMING NOW SECTION
const streamingNowDiv = document.createElement("dv")
const streamingSubContainer = document.createElement("dv")
const streamingNowImg = document.createElement("img")
const albumWithDisc = createImageElement(CoverAndDisc, ["mini-album"], streamingSubContainer)
const bandcampEmbed = createBandcampEmbed(
    'https://bandcamp.com/EmbeddedPlayer/album=3228863984/size=large/width=400px/height=500px/bgcol=333333/linkcol=0f91ff/artwork=none/tracklist=true/transparent=true/',
    ['bandcamp-embed'],
    streamingSubContainer
)

streamingSubContainer.classList.add("streaming-subcontainer-div")
streamingNowDiv.classList.add("content-section", "streaming-div")
streamingNowImg.src = StreamingBlinky

streamingNowDiv.append(streamingNowImg, streamingSubContainer)
albumBody.append(streamingNowDiv)

//LINKS SECTION
const linksSectionTitleContainer = document.createElement("div")
linksSectionTitleContainer.classList.add("content-section", "links-div")
const aboutSectionTitleContainer = document.createElement("div")
aboutSectionTitleContainer.classList.add("links-title-div")
const leftButterfly = document.createElement("img")
leftButterfly.classList.add("butterfly")
leftButterfly.src = ButterflySticker
const linksTitleText = document.createElement("h3")
linksTitleText.classList.add("links-title")
linksTitleText.textContent = 'LINKS'
const rightButterfly = document.createElement("img")
rightButterfly.classList.add("butterfly")
rightButterfly.src = ButterflySticker
aboutSectionTitleContainer.append(leftButterfly, linksTitleText, rightButterfly)
linksSectionTitleContainer.append(aboutSectionTitleContainer)
albumBody.append(linksSectionTitleContainer)

const linksSectionDiv = document.createElement("div")
linksSectionDiv.classList.add("content-section", "links-div")
// linksSectionDiv.append(AboutMeBlockImageArt)
//list of links for right content container
linksArray.forEach((entry, index) => {
    createALinkListItem(entry, index, linksSectionDiv)
})
albumBody.append(linksSectionDiv)


//ABOUT SECTION
const aboutContainerDiv = document.createElement("div")
aboutContainerDiv.classList.add("about-div")
const aboutBGImage = document.createElement("img")
aboutBGImage.src = AboutMeBlockImage 
const butterflyGifSticker = document.createElement("img")
butterflyGifSticker.src = ButterflySticker2
butterflyGifSticker.classList.add("butterfly-fixed")
const crossGifSticker = document.createElement("img")
crossGifSticker.src = SparkleCross
crossGifSticker.classList.add("cross-fixed")
// aboutContainerDiv.append(aboutBGImage, butterflyGifSticker, crossGifSticker)
// albumBody.append(aboutContainerDiv)


//FIXED POSITION IMAGES
//barbed wire border
const barbedWireImage = createImageElement(BarbedWire, ["barbed"], albumBody)
//chain border
const chainImage = createImageElement(Chain, ["chain"], albumBody)
//tired mud
// const tireMud = createImageElement(TireMud1, ["mud"], albumBody)
//dirt road
const dirtRoadImage = createImageElement(DirtRoad, ["dirt-road"], albumBody)
//anime angel
const animgeAngel = createImageElement(AnimeAngel, ["anime-angel"], albumBody)
//busch
const buschLight = createImageElement(BuschLight, ["sponsored"], albumBody)
//waffle house
// const waffleHouse = createImageElement(WaffleHouse, ["waffle-house"], albumBody)











////*~~*~~*`+~~*~~*~~*+~~*~~*~~*+~~THREE STUFF*`~~*~~*+~~*~~*~~*+~~*`~~*+~~*~~*~~*////

const WIDTH = 400
const HEIGHT = 400
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 100)
const renderer = new THREE.WebGLRenderer({ alpha: true }) // alpha: true = transparent canvas bg
renderer.setSize(WIDTH, HEIGHT)
albumBody.appendChild(renderer.domElement)

let dipcanModel
const loader = new GLTFLoader()
loader.load(
    dipcanUrl,
    (gltf) => {
        dipcanModel = gltf.scene
        dipcanModel.scale.set(2, 2, 2)
        scene.add(dipcanModel)
        console.log('Model loaded:', dipcanModel)
    },
    undefined, // progress callback ---- skipping this
    (error) => {
        console.error('Failed to load model:', error)
    }
)

// basic lighting so the model isn't pitch black
scene.add(new THREE.AmbientLight(0xffffff, 1))
scene.add(new THREE.DirectionalLight(0xffffff, 1))
//position camera
camera.position.z = 5

//aaand animate it
function animate() {
    requestAnimationFrame(animate)
    if(dipcanModel){
        dipcanModel.rotation.y += 0.01 
        dipcanModel.rotation.x += 0.01 
    }
    renderer.render(scene, camera)
    console.log("RUNNING....")
}
animate()






///////////////////////////////////////////////////////////////
//these utilS functions only used in this file//

function createBandcampEmbed(embedSrc, classNames = [], parent) {
    const iframe = document.createElement('iframe')
    iframe.src = embedSrc
    iframe.classList.add(...classNames)
    iframe.setAttribute('seamless', '')
    iframe.setAttribute('allow', 'autoplay')
    parent.appendChild(iframe)
    return iframe
}

function createALinkListItem(linkListEntry, index, parentContainer){
    const aElement = document.createElement("a")
    const linkContainerDiv = document.createElement("div")
    const spanElement = document.createElement("span")
    const imgElement = document.createElement("img")
    const tireBgImage = document.createElement("img")

    aElement.href = linkListEntry.url
    spanElement.textContent = `${linkListEntry.label}`
    imgElement.src = linkListEntry.icon
    // tireBgImage.src = TireBG

    aElement.setAttribute("id", `link-${index}`)
    aElement.classList.add("social-list-link")
    linkContainerDiv.classList.add("link-container-div")
    imgElement.classList.add("link-icon")
    tireBgImage.classList.add("tire-bg-img")


    linkContainerDiv.append( spanElement, imgElement)
    aElement.append(linkContainerDiv)
    parentContainer.append(aElement)
    return aElement
}


