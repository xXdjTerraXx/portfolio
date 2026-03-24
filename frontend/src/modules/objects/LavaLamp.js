import AnimatedObject from "../base_classes/AnimatedObject"
import SelectionArrow from "./SelectionArrow"
import { Sprite } from "pixi.js"


export default class LavaLamp extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitboxTexture, label, pngAssets, hitboxOffset){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitboxTexture, label, hitboxOffset)
        this.frameWidth = 125,
        this.frameHeight = 128,
        this.numberOfFrames = 0,
        this.currentFrame = 0

        this.pngAssets = pngAssets

        this.offSprite = new Sprite(this.pngAssets.LavaLampOff)
        this.offSprite.position.set(0,0)
        this.offSprite.scale.set(1.4, 1.3)
        this.offSprite.anchor.set(0.5)
        this.offSprite.label = 'lava_lamp_off'

        this.sprite.scale.set(1.4, 1.3)
        this.sprite.label = 'lava_lamp_on'

        this.on = true
        
    }

    handleClick = () => {
        console.log('clicked')
        this.on = !this.on
        if(this.on){
            this.mainContainer.removeChild(this.offSprite)
            this.mainContainer.addChild(this.sprite)
            this.mainContainer.addChild(this.selectionArrow.sprite)
            console.log("lamp clicked!!! turned on")
        } 
        else {
            this.mainContainer.removeChild(this.sprite)
            this.mainContainer.addChild(this.offSprite)
            this.mainContainer.removeChild(this.selectionArrow.sprite)
            console.log("lamp clicked!!! turned off")
        }
    }
}