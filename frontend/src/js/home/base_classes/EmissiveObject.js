import AnimatedObject from "./AnimatedObject"
import { Sprite } from "pixi.js"

export default class EmissiveObject extends AnimatedObject {
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
        hitboxOffset,
        lightManager,
        lightConfigKey
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
            hitboxOffset
        )

        this.lightManager = lightManager
        this.lightConfigKey = lightConfigKey

        this.on = true

        // =========================
        // 💡 LIGHT REGISTRATION
        // =========================
        this.lightId = `${label}_${Math.random()}`

        this.lightManager.registerLight(this.lightId, lightConfigKey, {
            isOn: this.on,
            x: this.mainContainer.x,
            y: this.mainContainer.y
        })

        // =========================
        // ✨ EMISSION SPRITE
        // =========================
        this.emissionSprite = new Sprite(this.sprite.texture)
        this.emissionSprite.anchor.set(0.5)
        this.emissionSprite.scale.copyFrom(this.sprite.scale)

        this.emissionSprite.blendMode = 'add'
        this.emissionSprite.alpha = 0.5

        // 🔥 tint from config (optional fallback)
        const lightConfig = this.lightManager.config.lights[lightConfigKey]
        this.emissionSprite.tint = lightConfig?.color || 0xffffff

        this.emissionSprite.zIndex = 10000

        this.roomEntitiesContainer.addChild(this.emissionSprite)

        // =========================
        // 🔁 UPDATE LOOP
        // =========================
        this.app.ticker.add(this.updateEmission)
    }

    updateEmission = () => {
        this.emissionSprite.position.set(
            this.mainContainer.x,
            this.mainContainer.y
        )

        this.emissionSprite.alpha = this.on ? 0.35 : 0
    }

    setLightState(isOn){
        this.on = isOn
        this.lightManager.setLightState(this.lightId, isOn)
    }
}