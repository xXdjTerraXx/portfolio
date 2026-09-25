import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Application{
    constructor(assetManager, sceneManager){
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
        this.renderer = new THREE.WebGLRenderer({ alpha: true }) // alpha: true = transparent canvas bg
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        // --- RESIZE HANDLING ---
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        this.assetManager = assetManager
        this.sceneManager = sceneManager

    }

    init = async () => {
        await this.assetManager.loadAllAssets()
        this.sceneManager.init()
    }
}