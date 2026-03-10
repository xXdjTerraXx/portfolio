import { Container, Sprite, Text, TextStyle } from "pixi.js"
import AnimatedObject from "../base_classes/AnimatedObject"
import SelectionArrow from "./SelectionArrow"
import { formatTimestamp, timeAgo } from "../../utils"
import { Tween, Easing } from "@tweenjs/tween.js"

export default class Character extends AnimatedObject{
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, moodsArray, personalStatus, smallThoughtBubbleTexture,
        mediumThoughtBubbleTexture, mainThoughtBubbleTexture
    ){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.sprite.label = "character"
        this.frameWidth = 187
        this.frameHeight = 157
        this.numberOfFrames = 0
        this.currentFrame = 0

        this.moodsArray = moodsArray
        this.personalStatus = personalStatus
        console.log("DEBUG MOOD AND STATUS: ", this.moodsArray, this.personalStatus)

        this.auxiallyThoughtBubble1 = new ThoughtBubbleAuxillary(smallThoughtBubbleTexture,20,-60)
        this.auxiallyThoughtBubble2 = new ThoughtBubbleAuxillary(mediumThoughtBubbleTexture,40,-100)
        this.mainThoughtBubble = new ThoughtBubbleMain(mainThoughtBubbleTexture,80,-220, this.moodsArray, this.personalStatus)
        //this array needed for display/hide tweening
        this.thoughtBubblesArray = [this.auxiallyThoughtBubble1, this.auxiallyThoughtBubble2, this.mainThoughtBubble]
        this.thoughtBubblesArray.forEach(bubble => this.sprite.addChild(bubble))
        this.thoughtBubblesAreDisplaying = false
        //for mouseover
        this.mouseOver = false
        this.shadowBlur = 10
        // this.selectionArrow = new SelectionArrow((this.x_pos + this.frameWidth / 2) - 25, this.y_pos)
        
        this.sprite.on("click", this.handleCharacterClick)
    }

    handleCharacterClick = () => {
        console.log("charcter click!!")
        if(!this.thoughtBubblesAreDisplaying)this.handleBubblesOpen()
        else this.handleBubblesClose()    
    }

    handleBubblesOpen = () => {
        if(this.thoughtBubblesAreDisplaying === true)return

        let small = { alpha: 0, scale:{x:0, y:0} }
        let medium = { alpha: 0, scale:{x:0, y:0} }
        let main = { alpha: 0, scale:{x:0, y:0} }

        const smallBubbleTween = new Tween(small)
        .to({ alpha: .6, scale:{x:1, y:1} }, 100)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => {
            this.auxiallyThoughtBubble1.alpha = small.alpha
            this.auxiallyThoughtBubble1.scale = small.scale
        })

        const smallBubbleTween2 = new Tween(medium)
        .to({ alpha: .7, scale: {x:1, y:1} }, 100)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => {
            this.auxiallyThoughtBubble2.alpha = medium.alpha
            this.auxiallyThoughtBubble2.scale = medium.scale
        })

        const mainBubbleTween = new Tween(main)
        .to({ alpha: .88, scale: {x:1, y:1} }, 100)
        .easing(Easing.Quadratic.Out)
        .onUpdate(() => {
            this.mainThoughtBubble.alpha = main.alpha
            this.mainThoughtBubble.scale = main.scale
        })

        smallBubbleTween.chain(smallBubbleTween2)
        smallBubbleTween2.chain(mainBubbleTween)
        smallBubbleTween.start()
        smallBubbleTween.onComplete(() => this.thoughtBubblesAreDisplaying = true)
    }

    handleBubblesClose = () => {
        if(this.thoughtBubblesAreDisplaying === false)return

        let small = { alpha: 1, scale:{x:1, y:1} }
        let medium = { alpha: 1, scale:{x:1, y:1} }
        let main = { alpha: 1, scale:{x:1, y:1} }

        const smallBubbleTween = new Tween(small)
        .to({ alpha: 0, scale:{x:0, y:0} }, 150)
        .easing(Easing.Quadratic.In)
        .onUpdate(() => {
            this.auxiallyThoughtBubble1.alpha = small.alpha
            this.auxiallyThoughtBubble1.scale = small.scale
        })

        const smallBubbleTween2 = new Tween(medium)
        .to({ alpha: 0, scale: {x:0, y:0} }, 150)
        .easing(Easing.Quadratic.In)
        .onUpdate(() => {
            this.auxiallyThoughtBubble2.alpha = medium.alpha
            this.auxiallyThoughtBubble2.scale = medium.scale
        })

        const mainBubbleTween = new Tween(main)
        .to({ alpha: 0, scale: {x:0, y:0} }, 150)
        .easing(Easing.Quadratic.In)
        .onUpdate(() => {
            this.mainThoughtBubble.alpha = main.alpha
            this.mainThoughtBubble.scale = main.scale
        })

        mainBubbleTween.chain(smallBubbleTween2)
        smallBubbleTween2.chain(smallBubbleTween)
        mainBubbleTween.start()
        .onComplete(() => this.handleResetBubbles())
        
    }

    handleResetBubbles = () => {
        this.thoughtBubblesArray.forEach(bubble => {
            bubble.alpha = 0
            bubble.scale.set(0)
        })
        this.thoughtBubblesAreDisplaying = false
    }
}

class ThoughtBubbleMain extends Sprite{
    constructor(texture, xPos, yPos, moodsArray, personalStatus){
        super(texture)
        //initialize alpha values to 0. tweening handles display
        this.alpha = 0
        this.anchor.set(.5)
        this.x = xPos
        this.y = yPos
        this.moodsArray = moodsArray
        this.personalStatus = personalStatus
        this.initContent()
    }

    initContent = () => {
        this.moodContainer = new Container()

        this.categoryTextStyle = new TextStyle({
            fontFamily: "monospace",
            fontSize: 18,
            fill: 0x000000,
            align: "left",
            wordWrap: true,
            wordWrapWidth: 160,
            dropShadow: true,
            dropShadowColor: "#e9e2e2",
            dropShadowBlur: 2,
            dropShadowDistance: 1,
            dropShadowAlpha: 0.25
        })
        this.contentTextStyle = new TextStyle({
            fontFamily: "monospace",
            fontSize: 18,
            fill: 0x8a6bff,
            align: "left",
            wordWrap: true,
            wordWrapWidth: 160,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 2,
            dropShadowDistance: 1,
            dropShadowAlpha: 0.25
        })

        this.smallTimeTextStyle = new TextStyle({
            fontFamily: "monospace",
            fontSize: 12,
            fill: 0x484358,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 160,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 2,
            dropShadowDistance: 1,
            dropShadowAlpha: 0.25
        })
        const mood = this.moodsArray[0]
        this.categoryTextMood = new Text('mood: ', this.categoryTextStyle)
        this.contentTextMood = new Text(`${mood.mood_label}${mood.mood_emoji}`, this.contentTextStyle)
        this.timeText = new Text(`${formatTimestamp(mood.created_at)}`, this.smallTimeTextStyle)
        
        this.categoryTextMood.position.set(0, 10)
        this.contentTextMood.position.set(`${this.categoryTextMood.width + 10}`, 10)
        this.timeText.position.set(`${this.contentTextMood.width / 2}`, `${this.contentTextMood.height + 10}`)

        this.moodContainer.addChild(this.categoryTextMood, this.contentTextMood, this.timeText)
        this.moodContainer.position.set(-75, -35)

        this.addChild(this.moodContainer)
    }
}

class ThoughtBubbleAuxillary extends Sprite{
    constructor(texture, xPos, yPos){
        super(texture)
        //initialize alpha values to 0. tweening handles display
        this.alpha = 0
        this.anchor.set(.5)
        this.x = xPos
        this.y = yPos
    }
}