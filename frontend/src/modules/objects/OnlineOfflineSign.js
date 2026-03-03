import { Sprite } from "pixi.js"
import AnimatedObject from "../base_classes/AnimatedObject"

const overlayDiv = document.querySelector(".glass-overlay")

export default class OnlineOfflineSign extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, infoBubbleTexture){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.frameWidth = 163
        this.frameHeight = 125
        this.numberOfFrames = 0
        this.currentFrame = 0
        this.clicked = false
        
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10
        // this.selectionArrow = new SelectionArrow((this.x_pos + this.frameWidth / 2) - 25, this.y_pos)
        this.interactive = true

        this.sprite.on("click", this.handleClick)

        this.infoBubble = new Sprite(infoBubbleTexture)
        this.infoBubble.label = "click_bubble"
        this.infoBubble.position.set(36, -92)
    }

    animate(cycleCount){
        
    }

    handleMouseOver(mouseX, mouseY){
        
    }

    handleClick = () => {
        if(this.sprite.children.includes(this.infoBubble)){
            this.sprite.removeChild(this.infoBubble)
        }
        else {
            this.sprite.addChild(this.infoBubble)
        }
        console.log("cliiiiiiick", this.infoBubble)
    }

    run = (cycleCount, mouseX, mouseY) => {
        
    }
}