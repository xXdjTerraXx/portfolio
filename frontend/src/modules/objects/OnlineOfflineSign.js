// import { Sprite, AnimatedSprite, Container, Text, TextStyle } from "pixi.js"
// import { Tween, Easing } from "@tweenjs/tween.js"
// import SelectionArrow from "./SelectionArrow"
// import { GlowFilter } from "pixi-filters"
// import { timeAgo } from "../../utils"

// export default class OnlineOfflineSign {
//     constructor(onlineSpritesheet, offlineSignTexture, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, onlineStatusBubbleTexture, onlineStatusObject, hitboxTexture, label, hitboxConfig){
    
//         this.app = app
//         //for the sign, either the online sprite or offline sprite is added to signContainer
//         //then THAT is what is added to the scene ^-^
//         this.mainContainer = new Container()
//         this.mainContainer.label = label
//         this.mainContainer.x = x_pos
//         this.mainContainer.y = y_pos

//         this.hitbox = new Sprite(hitboxTexture)
//         this.hitbox.position.set(hitboxConfig.offsetX,hitboxConfig.offsetY)
//         this.hitbox.eventMode = 'static'
//         this.hitbox.label = 'hitbox'
//         this.hitbox.alpha = 0
//         this.hitbox.on('pointerover', this.handleMouseIn)
//         this.hitbox.on('pointerout', this.handleMouseOut)
//         this.hitbox.on('click', this.handleClick)

//         this.roomEntitiesContainer = roomEntitiesContainer
//         this.desktopContainer = desktopContainer
//         this.desktopIsDisplaying = false
//         this.app.ticker.add(this.getIsDesktopDisplaying)

//         this.onlineStatusObject = onlineStatusObject
//         this.onlineStatusBubbleTexture = onlineStatusBubbleTexture
//         this.onlineStatusBubble = new OnlineStatusBubble(this.app, this.onlineStatusBubbleTexture, this.onlineStatusObject)

        
        
//         this.onlineSpritesheet = onlineSpritesheet
//         this.offlineSignTexture = offlineSignTexture


//         this.initOnlineSignSprite()
//         this.initOfflineSignSprite()
//         //buildSign looks at online status and adds the correct sign to container
//         this.buildSign()

//         //set up selection arrow
//         this.selection_arrow_sprite_sheet = arrowSpriteSheet
//         this.selectionArrow = new SelectionArrow(this.selection_arrow_sprite_sheet, x_pos, y_pos, app, this.mainContainer.children[0].height) 

//     }

//     initOnlineSignSprite = () => {
//         this.onlineSprite = new AnimatedSprite(this.onlineSpritesheet.animations.main)
//         this.onlineSprite.label = "online_sign"
//         this.onlineSprite.animationSpeed = 0.1666
//         this.onlineSprite.anchor.set(0.5)
//         this.onlineSprite.x = 0
//         this.onlineSprite.y = 0
//         this.onlineSprite.scale.set(0.8, 0.8)
//     }

//     initOfflineSignSprite = () => {
//         this.offlineSprite = new Sprite(this.offlineSignTexture)
//         this.offlineSprite.label = "offline_sign"
//         this.offlineSprite.anchor.set(0.5)
//         this.offlineSprite.x = 0
//         this.offlineSprite.y = 0
//         this.offlineSprite.scale.set(0.2, 0.2)
//     }

//     buildSign = () => {
//         //add the correct sprite as child of sign container
//         if (this.onlineStatusObject.isOnline == false){
//             this.mainContainer.addChild(this.offlineSprite, this.hitbox)
//         }
//         else{
//             this.mainContainer.addChild(this.onlineSprite, this.hitbox)
//             this.mainContainer.children[0].play()
//         }
//         //add the status bubble as a child too
//         this.mainContainer.addChild(this.onlineStatusBubble)
//          //add signContainer to scene
//         this.roomEntitiesContainer.addChild(this.mainContainer)
//     }

//     getIsDesktopDisplaying = () => {
//         this.desktopIsDisplaying = this.app.stage.children.some(cont => cont.label == 'desktop_container')
//     }

//     handleMouseIn = () => {
//         if(this.desktopIsDisplaying == false){

//         //add outline effect
//         this.mainContainer.filters = [new GlowFilter({alpha: 0.2, color: '#bbb4f3'})]
//         //display hovering arrow
//         this.app.stage.addChild(this.selectionArrow.sprite)
//     }
//     }

//     handleMouseOut = () => {
//         if(this.desktopIsDisplaying == false){

//         // remove outline effect from this
//         this.mainContainer.filters = null
//        //display hovering arrow
//         this.app.stage.removeChild(this.selectionArrow.sprite)
//         }
//     }

//     handleClick = () => {
//         this.onlineStatusBubble.isDisplaying
//         ? this.onlineStatusBubble.handleHide()
//         : this.onlineStatusBubble.handleDisplay()
//     }
// }

import EmissiveObject from "../base_classes/EmissiveObject"
import { Sprite, AnimatedSprite, Container, Text, TextStyle } from "pixi.js"
import { Tween, Easing } from "@tweenjs/tween.js"
import SelectionArrow from "./SelectionArrow"
import { GlowFilter } from "pixi-filters"
import { timeAgo } from "../../utils"

export default class OnlineOfflineSign extends EmissiveObject {
    constructor(
        onlineSpritesheet,
        offlineSignTexture,
        x_pos,
        y_pos,
        app,
        arrowSpriteSheet,
        roomEntitiesContainer,
        desktopContainer,
        onlineStatusBubbleTexture,
        onlineStatusObject,
        hitboxTexture,
        label,
        hitboxConfig,
        lightManager
    ){

        super(
            onlineSpritesheet, 
            x_pos,
            y_pos,
            app,
            arrowSpriteSheet,
            roomEntitiesContainer,
            desktopContainer,
            hitboxTexture,
            label,
            hitboxConfig,
            lightManager,
            'onlineSign'
        )

        this.onlineStatusObject = onlineStatusObject
        this.onlineStatusBubbleTexture = onlineStatusBubbleTexture

        this.mainContainer.removeChild(this.sprite) // remove base animated sprite

        // =========================
        // 🔥 ONLINE (animated neon)
        // =========================
        this.onlineSprite = new AnimatedSprite(onlineSpritesheet.animations.main)
        this.onlineSprite.anchor.set(0.5)
        this.onlineSprite.scale.set(.4)
        this.onlineSprite.animationSpeed = 0.1666

        // =========================
        // 🌑 OFFLINE (static, no light)
        // =========================
        this.offlineSprite = new Sprite(offlineSignTexture)
        this.offlineSprite.anchor.set(0.5)
        this.offlineSprite.scale.set(0.2)

        // =========================
        // 💬 STATUS BUBBLE
        // =========================
        this.onlineStatusBubble = new OnlineStatusBubble(
            this.app,
            this.onlineStatusBubbleTexture,
            this.onlineStatusObject
        )

        // =========================
        // BUILD INITIAL STATE
        // =========================
        this.buildSign()

        // neon tuning
        this.baseAlpha = 0.25
        this.flickerStrength = 0.12
        this.time = 0

        // make glow slightly bigger
        this.emissionSprite.scale.set(0.4)

        //reposition the hitbox on this one
        this.hitbox.position.set(-.5, .5)
    }

    buildSign = () => {
        this.mainContainer.removeChildren()

        if (!this.onlineStatusObject.isOnline) {
            this.mainContainer.addChild(this.offlineSprite, this.hitbox)

            this.setLightState(false)
            this.emissionSprite.alpha = 0
        } else {
            this.mainContainer.addChild(this.onlineSprite, this.hitbox)
            this.onlineSprite.play()

            this.setLightState(true)
        }

        this.mainContainer.addChild(this.onlineStatusBubble)
    }

    // =========================
    // ✨ NEON FLICKER
    // =========================
    // updateEmission = () => {
    //     this.time += this.app.ticker.deltaTime

    //     this.emissionSprite.position.set(
    //         this.mainContainer.x,
    //         this.mainContainer.y
    //     )

    //     if (!this.onlineStatusObject.isOnline) {
    //         this.emissionSprite.alpha = 0
    //         return
    //     }

    //     const flicker =
    //         Math.sin(this.time * 0.2) * this.flickerStrength +
    //         (Math.random() * 0.05)

    //     this.emissionSprite.alpha = this.baseAlpha + flicker
    // }

    //over riding the base class here bc this one has a neon flickerr!!
    updateEmission = () => {
        // always keep emission sprite positioned
        this.emissionSprite.position.set(
            this.mainContainer.x,
            this.mainContainer.y
        )

        // if offline no light at all
        if (!this.onlineStatusObject.isOnline) {
            this.emissionSprite.alpha = 0
            this.lightManager.setLightIntensity(this.lightId, 0)
            return
        }

        // flicker
        const offFrames = new Set([3, 5, 7, 16, 18, 30])
        const frame = this.onlineSprite.currentFrame
        const isFlicker = offFrames.has(frame)

        // emission
        if (isFlicker) {
            this.emissionSprite.alpha = 0.05
        } else {
            const base = 0.25
            const variation = Math.sin(frame * 0.8) * 0.05
            this.emissionSprite.alpha = base + variation
        }

        // LIGHT MANAGER (room light)
        this.lightManager.setLightIntensity(
            this.lightId,
            isFlicker ? 0.05 : 0.25
        )
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