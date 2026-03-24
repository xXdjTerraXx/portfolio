// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
import * as PIXI from 'pixi.js'
import { GlowFilter } from 'pixi-filters'
import { desk_spritesheet_json2 } from '../../json/desk_spritesheet'
import SelectionArrow from './SelectionArrow'
import RokuScene from './tv_scenes/RokuScene'
import Screensaver from './tv_scenes/Screensaver'

export default class TVStand {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, TVStandImage, pngAssets, weatherJson, weatherIcons, lastPlayedJson, hitboxTexture, label, hitboxConfig){
        
        this.app = app
        this.numberOfFrames = 0
        this.sprite_sheet = sprite_sheet
        this.sprite = new PIXI.AnimatedSprite(this.sprite_sheet.animations.main)
        this.sprite.animationSpeed = 0.1666;
        this.sprite.anchor.set(0.5)
        this.sprite.position.set(0,0)
        this.sprite.animationSpeed = .2
        this.sprite.loop = false
        this.sprite.onComplete = () => this.sprite.gotoAndStop(0)

        this.hitbox = new PIXI.Sprite(hitboxTexture)
        this.hitbox.eventMode = 'static'
        this.hitbox.label = 'hitbox'
        this.hitbox.position.set(hitboxConfig.offsetX,hitboxConfig.offsetY)
        this.hitbox.scale.set(hitboxConfig.scaleX, hitboxConfig.scaleY)
        this.hitbox.anchor.set(0.5)
        this.hitbox.alpha = 0

        this.mainContainer = new PIXI.Container()
        this.mainContainer.label = `${label}_main_container`
        this.mainContainer.position.set(x_pos, y_pos)

        this.TVStandImage = TVStandImage
        this.pngAssets = pngAssets
        this.weatherIcons = weatherIcons

        this.desktopIsDisplaying = false
        this.weatherJson = weatherJson
        this.lastPlayedJson = lastPlayedJson

        //mouse events
        this.hitbox.on('pointerover', this.handleMouseIn)
        this.hitbox.on('pointerout', this.handleMouseOut)
        this.hitbox.on('click', this.handleClick)

        this.selection_arrow_sprite_sheet = arrowSpriteSheet
        this.selectionArrow = new SelectionArrow(this.selection_arrow_sprite_sheet, x_pos, y_pos, app, this.sprite.height) 

        this.roomEntitiesContainer = roomEntitiesContainer
        this.desktopContainer = desktopContainer

        this.sceneIndex = 0
        this.sceneList = [
            {
                sprite: new RokuScene(this.sprite, -245.5, -296.5, 1.01, 1.01, 'red', this.pngAssets, this.mainContainer, this.lastPlayedJson)
            },
            {
                sprite: new Screensaver(-245.5, -296.5, this.pngAssets, this.weatherJson, this.weatherIcons)
            }
        ]

        this.mainContainer.addChild(this.sprite, this.sceneList[this.sceneIndex].sprite.container, this.hitbox)
        this.roomEntitiesContainer.addChild(this.mainContainer)
        
        this.app.ticker.add(this.getIsDesktopDisplaying)
        this.app.ticker.add(this.sceneList[this.sceneIndex].sprite.animate)
    }

    animateScene = () => {
        this.sceneList[this.sceneIndex].animate()
    }

    getIsDesktopDisplaying = () => {
        this.desktopIsDisplaying = this.app.stage.children.some(cont => cont.label == 'desktop_container')
    }


    handleMouseIn = () => {
        if(this.desktopIsDisplaying == false){

        //add outline effect
        this.sprite.filters = [new GlowFilter({alpha: 0.2, color: '#bbb4f3'})];
        //display hovering arrow
        this.app.stage.addChild(this.selectionArrow.sprite)
        }
    }

    handleMouseOut = () => {
        if(this.desktopIsDisplaying == false){

        // // Remove outline effect from this
        this.sprite.filters = null;
       //display hovering arrow
        this.app.stage.removeChild(this.selectionArrow.sprite)
        }
    }

    handleClick = async () => {
        this.app.ticker.remove(this.sceneList[this.sceneIndex].sprite.animate)
        this.mainContainer.removeChild(this.sceneList[this.sceneIndex].sprite.container)
        this.sceneIndex < this.sceneList.length - 1 ? this.sceneIndex += 1 : this.sceneIndex = 0
        this.sprite.play() // play the blue screen transition animation
        this.sprite.onComplete = () => {
            
            this.sceneList[this.sceneIndex].sprite.load()
            this.mainContainer.addChild(this.sceneList[this.sceneIndex].sprite.container)
            this.app.ticker.add(this.sceneList[this.sceneIndex].sprite.animate)
        }
    }
}