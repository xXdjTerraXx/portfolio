// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { desk_spritesheet_json2 } from '../../json/desk_spritesheet'
import SelectionArrow from '../objects/SelectionArrow'

export default class AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitboxTexture, label, hitboxConfig = { offsetX: 0, offsetY: 0, scaleX: 1, scaleY: 1 }){
        
        this.app = app
        this.numberOfFrames = 0

        this.sprite_sheet = sprite_sheet
        this.sprite = new PIXI.AnimatedSprite(this.sprite_sheet.animations.main)
        this.sprite.animationSpeed = 0.1666;
        this.sprite.anchor.set(0.5)
        this.sprite.position.set(0,0)

        this.hitbox = new PIXI.Sprite(hitboxTexture)
        this.hitbox.label = `${label}_hitbox`
        this.hitbox.anchor.set(0.5)
        this.hitbox.position.set(hitboxConfig.offsetX, hitboxConfig.offsetY)
        this.hitbox.scale.set(hitboxConfig.scaleX, hitboxConfig.scaleY)
        this.hitbox.alpha = 0


        //the container that holds the sprite and the hitbox
        this.mainContainer = new PIXI.Container()
        this.mainContainer.label = label
        this.mainContainer.position.set(x_pos, y_pos)
        

        this.desktopIsDisplaying = false

        // Set up mouse hover event for this sprite
        this.hitbox.eventMode = 'static'
        this.hitbox.on('pointerover', this.handleMouseIn)
        this.hitbox.on('pointerout', this.handleMouseOut)
        this.hitbox.on('pointerdown', (e) => this.handleClick(e));

        this.roomEntitiesContainer = roomEntitiesContainer

        this.mainContainer.addChild(this.sprite, this.hitbox)
        this.roomEntitiesContainer.addChild(this.mainContainer)
        this.desktopContainer = desktopContainer
        // this.app.stage.addChild(this.sprite)
        this.sprite.play()
        this.selection_arrow_sprite_sheet = arrowSpriteSheet
        this.selectionArrow = new SelectionArrow(this.selection_arrow_sprite_sheet, this.sprite.width / 2, -this.sprite.height, app, this.sprite.height) 
        this.app.ticker.add(this.getIsDesktopDisplaying)
    }

    getIsDesktopDisplaying = () => {
        this.desktopIsDisplaying = this.app.stage.children.some(cont => cont.label == 'desktop_container')
    }


    handleMouseIn = () => {
        if(this.desktopIsDisplaying == false){

        //add outline effect
        this.sprite.filters = [new GlowFilter({alpha: 0.2, color: '#bbb4f3'})];
        //display hovering arrow
        this.mainContainer.addChild(this.selectionArrow.sprite)
        this.selectionArrow.sprite.x = 0
        this.selectionArrow.sprite.y = -(this.sprite.height / 2)
    }
    }

    handleMouseOut = () => {
        if(this.desktopIsDisplaying == false){

        // // Remove outline effect from this
        this.sprite.filters = null;
       //display hovering arrow
        this.mainContainer.removeChild(this.selectionArrow.sprite)
        }
    }

    //this just for safety
    handleClick = () => {console.log("fah qqqq")}
}