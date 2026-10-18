import AnimatedObject from "../base_classes/AnimatedObject"
import SelectionArrow from "./SelectionArrow"
import EmissiveObject from "../base_classes/EmissiveObject"
import { Sprite } from "pixi.js"


// export default class LavaLamp extends AnimatedObject {
//     constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitboxTexture, label, pngAssets, hitboxOffset, lightManager){
//         super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitboxTexture, label, hitboxOffset)
//         this.frameWidth = 125,
//         this.frameHeight = 128,
//         this.numberOfFrames = 0,
//         this.currentFrame = 0

//         this.pngAssets = pngAssets

//         this.offSprite = new Sprite(this.pngAssets.LavaLampOff)
//         this.offSprite.position.set(0,0)
//         this.offSprite.scale.set(1.4, 1.3)
//         this.offSprite.anchor.set(0.5)
//         this.offSprite.label = 'lava_lamp_off'

//         this.sprite.scale.set(1.4, 1.3)
//         this.sprite.label = 'lava_lamp_on'

//         this.on = true
//         this.sprite.alpha = 1.2
//         this.lightManager = lightManager
//         //light id is used when storing all the lights in the manager's lights object
//         this.lightId = `lavaLamp_${Math.random()}`
//         this.lightManager.registerLight(this.lightId, 'lavaLamp', {
//             isOn: this.on,
//             x: this.mainContainer.x,
//             y: this.mainContainer.y
//         })
//     }

//     handleClick = () => {
//         console.log('clicked')
//         this.on = !this.on
//         //update light manager with new this.on
//         this.lightManager.setLightState(this.lightId, this.on);
//         if(this.on){
//             this.mainContainer.removeChild(this.offSprite)
//             this.mainContainer.addChild(this.sprite)
//             this.mainContainer.addChild(this.selectionArrow.sprite)
//             console.log("lamp clicked!!! turned on")
//         } 
//         else {
//             this.mainContainer.removeChild(this.sprite)
//             this.mainContainer.addChild(this.offSprite)
//             this.mainContainer.removeChild(this.selectionArrow.sprite)
//             console.log("lamp clicked!!! turned off")
//         }
//     }
// }

//this version uses the emitter sprite
export default class LavaLamp extends EmissiveObject {
    constructor(
        sprite_sheet,
        x_pos,
        y_pos,
        app,
        arrowSpriteSheet,
        roomEntitiesContainer,
        desktopContainer,
        hitboxTexture,
        label,
        pngAssets,
        hitboxOffset,
        lightManager
    ){
        super(
            sprite_sheet,
            x_pos,
            y_pos,
            app,
            arrowSpriteSheet,
            roomEntitiesContainer,
            desktopContainer,
            hitboxTexture,
            label,
            hitboxOffset,
            lightManager,
            'lavaLamp' // 🔥 config key
        )

        this.pngAssets = pngAssets

        this.offSprite = new Sprite(this.pngAssets.LavaLampOff)
        this.offSprite.anchor.set(0.5)
        this.offSprite.scale.set(1.4, 1.3)

        this.sprite.scale.set(1.4, 1.3)
    }

    handleClick = () => {
        this.setLightState(!this.on)

        if(this.on){
            this.mainContainer.removeChild(this.offSprite)
            this.mainContainer.addChild(this.sprite)
            this.mainContainer.addChild(this.selectionArrow.sprite)
        } 
        else {
            this.mainContainer.removeChild(this.sprite)
            this.mainContainer.addChild(this.offSprite)
            this.mainContainer.removeChild(this.selectionArrow.sprite)
        }
    }
}