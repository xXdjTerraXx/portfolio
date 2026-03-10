import { Sprite, AnimatedSprite, Container, Text, TextStyle } from "pixi.js"
import { Tween, Easing } from "@tweenjs/tween.js"
import SelectionArrow from "./SelectionArrow"
import { GlowFilter } from "pixi-filters"
import { timeAgo } from "../../utils"

export default class OnlineOfflineSign {
    constructor(onlineSpritesheet, offlineSignTexture, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, onlineStatusBubbleTexture, onlineStatusObject){
    
        this.app = app
        //for the sign, either the online sprite or offline sprite is added to signContainer
        //then THAT is what is added to the scene ^-^
        this.signContainer = new Container()
        this.signContainer.x = x_pos
        this.signContainer.y = y_pos
        this.signContainer.label = "sign_container"
        this.signContainer.interactive = true
        this.signContainer.eventMode = 'static'
        this.signContainer.on('pointerover', this.handleMouseIn)
        this.signContainer.on('pointerout', this.handleMouseOut)
        this.signContainer.on('click', this.handleClick)

        this.roomEntitiesContainer = roomEntitiesContainer
        this.desktopContainer = desktopContainer
        this.desktopIsDisplaying = false
        this.app.ticker.add(this.getIsDesktopDisplaying)

        this.onlineStatusObject = onlineStatusObject
        this.onlineStatusBubbleTexture = onlineStatusBubbleTexture
        this.onlineStatusBubble = new OnlineStatusBubble(this.app, this.onlineStatusBubbleTexture, this.onlineStatusObject)

        
        
        this.onlineSpritesheet = onlineSpritesheet
        this.offlineSignTexture = offlineSignTexture


        this.initOnlineSignSprite()
        this.initOfflineSignSprite()
        //buildSign looks at online status and adds the correct sign to container
        this.buildSign()

        //set up selection arrow
        this.selection_arrow_sprite_sheet = arrowSpriteSheet
        this.selectionArrow = new SelectionArrow(this.selection_arrow_sprite_sheet, x_pos, y_pos, app, this.signContainer.children[0].height) 

    }

    initOnlineSignSprite = () => {
        this.onlineSprite = new AnimatedSprite(this.onlineSpritesheet.animations.main)
        this.onlineSprite.label = "online_sign"
        this.onlineSprite.animationSpeed = 0.1666
        this.onlineSprite.anchor.set(0.5)
        this.onlineSprite.x = 0
        this.onlineSprite.y = 0
        this.onlineSprite.scale.set(0.8, 0.8)
    }

    initOfflineSignSprite = () => {
        this.offlineSprite = new Sprite(this.offlineSignTexture)
        this.offlineSprite.label = "offline_sign"
        this.offlineSprite.anchor.set(0.5)
        this.offlineSprite.x = 0
        this.offlineSprite.y = 0
        this.offlineSprite.scale.set(0.2, 0.2)
    }

    buildSign = () => {
        //add the correct sprite as child of sign container
        if (this.onlineStatusObject.isOnline == false){
            this.signContainer.addChild(this.offlineSprite)
        }
        else{
            this.signContainer.addChild(this.onlineSprite)
            this.signContainer.children[0].play()
        }
        //add the status bubble as a child too
        this.signContainer.addChild(this.onlineStatusBubble)
         //add signContainer to scene
        this.roomEntitiesContainer.addChild(this.signContainer)
    }

    getIsDesktopDisplaying = () => {
        this.desktopIsDisplaying = this.app.stage.children.some(cont => cont.label == 'desktop_container')
    }

    handleMouseIn = () => {
        if(this.desktopIsDisplaying == false){

        //add outline effect
        this.signContainer.filters = [new GlowFilter({alpha: 0.2, color: '#bbb4f3'})]
        //display hovering arrow
        this.app.stage.addChild(this.selectionArrow.sprite)
    }
    }

    handleMouseOut = () => {
        if(this.desktopIsDisplaying == false){

        // remove outline effect from this
        this.signContainer.filters = null
       //display hovering arrow
        this.app.stage.removeChild(this.selectionArrow.sprite)
        }
    }

    handleClick = () => {
        this.onlineStatusBubble.isDisplaying
        ? this.onlineStatusBubble.handleHide()
        : this.onlineStatusBubble.handleDisplay()
    }
}

class OnlineStatusBubble extends Sprite {

    constructor(app,texture, statusObject) {
        super(texture)
        this.app = app
        
        this.label = "online_status_info_bubble"

        this.x = 48
        this.y = -94
        this.anchor.set(0.5)

        this.scale.set(0)

        this.statusObject = statusObject

        this.isDisplaying = false

        this.baseY = this.y
        this.floatTween = null

        //used for real time update of time since presence changed
        this.timeAccumulator = 0

        this.initText()

        //add the function to the ticker needed to update time since in real time
        this.app.ticker.add((delta) => {
            this.updateTime(delta)
        })
    }

    initText = () => {
        const statusEmoji = `${this.statusObject.presenceStateObject.status !== "offline" ? this.statusObject.presenceStateObject.emoji : '❌'}`
        const categoryStyle = new TextStyle({
            fontFamily: "monospace",
            fontSize: 12,
            fill: 0xffffff,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 160,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 2,
            dropShadowDistance: 1,
            dropShadowAlpha: 0.25
        })

        const timeAgoStyle = new TextStyle({
            fontFamily: "monospace",
            fontSize: 10,
            fill: 0xa6a6a6,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 160,
        })

        this.presenceText = new Text({
            text: `currently: ${this.statusObject.presenceStateObject.status} ${statusEmoji}`,
            style: categoryStyle
        })

        this.presenceText.anchor.set(0.5)
        this.presenceText.y = -5

        this.discordStatusText = new Text({
            text: `discord: ${this.statusObject.discordStateObject.username} ${this.statusObject.discordStateObject.isOnline ? '🟢' : '🔘'}`,
            style: categoryStyle
        })
        this.discordStatusText.anchor.set(0.5)
        this.discordStatusText.y = -25

        this.timeAgoText = new Text({
            text: `${this.formatElapsedTime()}`,
            style: timeAgoStyle
        })
        this.timeAgoText.y = 5
        this.timeAgoText.x = -75

        this.addChild(this.presenceText, this.discordStatusText, this.timeAgoText)
    }

    handleDisplay = () => {
        if (this.isDisplaying) return

        this.isDisplaying = true

        const pop = { x: 0, y: 0 }

        new Tween(pop)
            .to({ x: 0.9, y: 1.15 }, 180)
            .easing(Easing.Back.Out)
            .onUpdate(() => {
                this.scale.set(pop.x, pop.y)
            })
            .onComplete(() => {

                new Tween(pop)
                    .to({ x: 1.05, y: 0.95 }, 120)
                    .easing(Easing.Quadratic.Out)
                    .onUpdate(() => {
                        this.scale.set(pop.x, pop.y)
                    })
                    .onComplete(() => {

                        new Tween(pop)
                            .to({ x: 1, y: 1 }, 120)
                            .easing(Easing.Quadratic.Out)
                            .onUpdate(() => {
                                this.scale.set(pop.x, pop.y)
                            })
                            .start()

                        this.handleIdleFloat()
                        this.handleIdleWiggle()

                    })
                    .start()

            })
            .start()
    }

    handleIdleFloat = () => {

        if (this.floatTween) return

        const float = { y: this.baseY }

        const up = new Tween(float)
            .to({ y: this.baseY - 6 }, 2000)
            .easing(Easing.Sinusoidal.InOut)
            .onUpdate(() => {
                this.y = float.y
            })

        const down = new Tween(float)
            .to({ y: this.baseY }, 2000)
            .easing(Easing.Sinusoidal.InOut)
            .onUpdate(() => {
                this.y = float.y
            })

        up.chain(down)
        down.chain(up)

        this.floatTween = up

        up.start()
    }

    handleIdleWiggle = () => {

        const rot = { r: 0 }

        const left = new Tween(rot)
            .to({ r: -0.02 }, 2200)
            .easing(Easing.Sinusoidal.InOut)
            .onUpdate(() => {
                this.rotation = rot.r
            })

        const right = new Tween(rot)
            .to({ r: 0.02 }, 2200)
            .easing(Easing.Sinusoidal.InOut)
            .onUpdate(() => {
                this.rotation = rot.r
            })

        left.chain(right)
        right.chain(left)

        left.start()
    }

    handleHide = () => {

    if (!this.isDisplaying) return

    this.isDisplaying = false

    //clean up the other tweens
    if (this.floatTween) {
        this.floatTween.stop()
        this.floatTween = null
    }

    const hideTween = { x: this.scale.x, y: this.scale.y, yPos: this.y }

    new Tween(hideTween)
        .to({ x: 0, y: 0, yPos: this.baseY - 10 }, 300)
        .easing(Easing.Back.In)
        .onUpdate(() => {
            this.scale.set(hideTween.x, hideTween.y)
            this.y = hideTween.yPos
        })
        .start()
    }

    calculateTime = () => {
        const sessionStart = this.statusObject.sessionStart
        const currentTime = Date.now()

        return currentTime - sessionStart
    }

   updateTime = (delta) => {

        this.timeAccumulator += delta

        if (this.timeAccumulator < 60) return // roughly 1 second

        this.timeAccumulator = 0

        this.timeAgoText.text = this.formatElapsedTime()
    }

    formatElapsedTime = () => {
        // console.log("sessionStart:", this.statusObject.sessionStart)
        // console.log("type:", typeof this.statusObject.sessionStart)

        const sessionStart = this.statusObject.presenceStateObject.sessionStart
        const elapsedSeconds = Math.floor((Date.now() - sessionStart) / 1000)

        const hours = Math.floor(elapsedSeconds / 3600)
        const minutes = Math.floor((elapsedSeconds % 3600) / 60)
        const seconds = elapsedSeconds % 60

        const pad = (n) => String(n).padStart(2, "0")

        return `${hours} hrs, ${pad(minutes)} mins, ${pad(seconds)} secs`
    }

}