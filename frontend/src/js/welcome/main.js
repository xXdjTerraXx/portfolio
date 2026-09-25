import Application from "./core/Application"
import AssetManager from "./core/AssetManager"
import { graphics2DAssetManifest, graphics3DAssetManifest } from "./assetManifest"
import SceneManager from "./scenes/SceneManager"


const assetManager = new AssetManager(graphics2DAssetManifest, graphics3DAssetManifest)
const sceneManager = new SceneManager()
const mainApplication = new Application(assetManager, sceneManager)
await mainApplication.init()