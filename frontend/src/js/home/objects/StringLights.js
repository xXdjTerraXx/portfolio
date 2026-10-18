import { GlowFilter } from "pixi-filters"
import StaticObject from "../base_classes/StaticObject"
import { Sprite } from "pixi.js"
import { Tween, Easing } from "@tweenjs/tween.js"

export default class StringLights extends StaticObject{
    constructor(src, x_pos, y_pos, app, roomEntitiesContainer, lightsImage, lightsImage2){
        super(src, x_pos, y_pos, app, roomEntitiesContainer)
        this.sprite.label = "string_lights_lights"

        this.maxGlowAlphaAmount = 1
        this.minGlowAlphaAmount = .3

        this.lightsSprite = new Sprite(lightsImage)
        this.lightsSprite.label = "string_lights_string"
        this.lightsSprite.x = 0
        this.lightsSprite.y = 0
        this.lightsSprite.anchor.set(0.0, 0.0)
        this.sprite.addChild(this.lightsSprite)

        this.lightsSprite2 = new Sprite(lightsImage2)
        this.lightsSprite2.label = "string_lights_string2"
        this.lightsSprite2.x = 0
        this.lightsSprite2.y = 0
        this.lightsSprite2.anchor.set(0.0, 0.0)
        this.sprite.addChild(this.lightsSprite2)

        this.glowFilter1 = new GlowFilter({distance: 30, innerStrength: 7.18, outerStrength: 15, alpha: this.maxGlowAlphaAmount, color: "0df8e8"})
        this.glowFilter2 = new GlowFilter({distance: 30, innerStrength: 7.18, outerStrength: 15, alpha: this.minGlowAlphaAmount, color: "0df8e8"})
        this.lightsSprite.filters = [this.glowFilter1]
        this.lightsSprite2.filters = [this.glowFilter2]

       

        this.startGlowPulse1()
        this.startGlowPulse2()
    }  

    startGlowPulse1 = () => {
        const tweenDown = new Tween(this.glowFilter1)
            .to({ alpha: this.minGlowAlphaAmount }, 2000)
            .easing(Easing.Quadratic.InOut)

        const tweenUp = new Tween(this.glowFilter1)
            .to({ alpha: this.maxGlowAlphaAmount }, 2000)
            .easing(Easing.Quadratic.InOut)
        tweenUp.chain(tweenDown)
        tweenDown.chain(tweenUp)
        
        tweenDown.start()
    }

    startGlowPulse2 = () => {
        const tweenDown = new Tween(this.glowFilter2)
            .to({ alpha: this.minGlowAlphaAmount }, 2000)
            .easing(Easing.Quadratic.InOut)

        const tweenUp = new Tween(this.glowFilter2)
            .to({ alpha: this.maxGlowAlphaAmount }, 2000)
            .easing(Easing.Quadratic.InOut)

        tweenUp.chain(tweenDown)
        tweenDown.chain(tweenUp)
        
        tweenUp.start()
    }
    
}