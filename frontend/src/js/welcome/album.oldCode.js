import './styles/album_style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import dipcanUrl from './models/dipcan.glb'
import BGVideo from './video/bg_video.mp4'
import LogoPulsingVideo from './video/logo_pulse_compressed.webm'
import SigilLogo from './img/album/sigil_deer.png'
import CoverAndDisc from './img/album/cover_and_cd.png'
import DJTerraRealTree from './img/album/real_tree_dj_terra.png'
import BarbedWire from './img/album/barbed.png'
import Chain from './img/album/chain.png'
import TireMud1 from './img/album/tired_mud1.jpg'
import DirtRoad from './img/album/dirt_cloud.png'
import AnimeAngel from './img/album/anime_angel.png'
import { createImageElement } from '../../utils'

//SETUP
const albumBody = document.querySelector("body")
//container for all the logos n stuff
const logosContainer = document.createElement("div")
logosContainer.classList.add("container")
//container for content/links/etc
const contentContainer = document.createElement("div")
contentContainer.classList.add("container")
//append both containers
albumBody.append(logosContainer, contentContainer)

//IMAGES
//barbed wire border
const barbedWireImage = createImageElement(BarbedWire, ["barbed"], albumBody)
//chain border
const chainImage = createImageElement(Chain, ["chain"], albumBody)
//tired mud
const tireMud = createImageElement(TireMud1, ["mud"], albumBody)
//sigil logo
const sigilLogo = createImageElement(SigilLogo, ["sigil-logo"], logosContainer)
//text logo
const textLogo = createImageElement(DJTerraRealTree, ["text-logo"], logosContainer)
//dirt road
const dirtRoadImage = createImageElement(DirtRoad, ["dirt-road"], albumBody)
//album cover with cd
const albumWithDisc = createImageElement(CoverAndDisc, ["mini-album"], contentContainer)
//anime angel
const animgeAngel = createImageElement(AnimeAngel, ["anime-angel"], albumBody)


//background video
const canVideo = document.createElement('video')
canVideo.src = BGVideo 
canVideo.autoplay = true
canVideo.loop = true
canVideo.muted = true
canVideo.playsInline = true 
canVideo.classList.add("background-video")
albumBody.appendChild(canVideo) 

//foreground video
// const logoPulseVideo = document.createElement('video')
// logoPulseVideo.src = LogoPulsingVideo 
// logoPulseVideo.autoplay = true
// logoPulseVideo.loop = true
// logoPulseVideo.muted = true
// logoPulseVideo.playsInline = true 
// logoPulseVideo.classList.add("background-video")
// albumBody.appendChild(logoPulseVideo) 





////*~~*~~*`+~~*~~*~~*+~~*~~*~~*+~~THREE STUFF*`~~*~~*+~~*~~*~~*+~~*`~~*+~~*~~*~~*////

const WIDTH = 400
const HEIGHT = 400
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 100)
const renderer = new THREE.WebGLRenderer({ alpha: true }) // alpha: true = transparent canvas bg
renderer.setSize(WIDTH, HEIGHT)
logosContainer.appendChild(renderer.domElement)

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


