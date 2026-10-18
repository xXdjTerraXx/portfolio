import 'pixi.js/advanced-blend-modes'
import { Sprite, Container, Graphics } from 'pixi.js'


export default class LightManager {
    constructor(app, LIGHTING_CONFIG, lightsAssets, roomEntitiesContainer) {
        this.app = app
        this.config = LIGHTING_CONFIG
        this.lightsAssets = lightsAssets
        //set parent container
        this.parent = roomEntitiesContainer

        //later this is populated with lights from different sources
        this.lights = {}

        this.maxLight = 1.0
        this.maxDarkness = 1.0

        // 🌑 create darkness overlay
        this.darkOverlay = new Graphics()
            .beginFill(0x0a0a1a, 1)
            .drawRect(0, 0, app.screen.width, app.screen.height)
            .endFill();
        this.darkOverlay.label = 'darkness_overlay'
        this.darkOverlay.alpha = 0

        this.lightContainer = new Container();
        this.lightContainer.label = 'light_container'
        
    }

    init = () => {
        //add dark overlay to roomEntities
        this.parent.addChild(this.darkOverlay)
        //add update to ticker
        this.app.ticker.add(this.update)
    }

    initLightContainer = () => {
        this.parent.addChild(this.lightContainer);
    }

    registerLight(id, configKey, overrides = {}) {
        const baseConfig = this.config.lights[configKey];

        const light = {
            ...baseConfig,
            ...overrides,
            sprite: null
        };

        //create emitter sprite
        if (light.useSprite) {
            const texture = this.lightsAssets[light.texture]
            // const texture = Assets.get(light.texture);

            const sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.label = `${configKey}_light_sprite`
            sprite.blendMode = 'add'
            sprite.alpha = 0;
            //DWEBUG STUFF
            // sprite.alpha = 0.5;
            sprite.tint = light.color;
            sprite.scale.set(light.radius / 200);

            this.lightContainer.addChild(sprite);

            light.sprite = sprite;
        }

        this.lights[id] = light;
    }

    setLightState =(id, isOn) => {
        if (this.lights[id]) {
            this.lights[id].isOn = isOn
        }
    }

    //this method used in the online sign for its flicker effect
    setLightIntensity(id, intensity) {
        if (!this.lights[id]) return

        this.lights[id].intensity = intensity
    }

    updateLightConfig(id, configKey) {
    const baseConfig = this.config.lights[configKey];

    if (!this.lights[id] || !baseConfig) return;

    // preserve runtime values (like isOn, position)
    const current = this.lights[id];

    this.lights[id] = {
        ...baseConfig,
        ...current
    };
    }

    update = () => {
        let totalLight = 0

        //UPDATE THE DARKNESS OVERLAY
        for (const id in this.lights) {
            const light = this.lights[id]
            if (light.isOn) {
                totalLight += light.intensity
            }
        }

        const brightness = Math.min(totalLight, this.maxLight)

        const targetAlpha = this.maxDarkness * (1 - brightness)

        this.darkOverlay.alpha = targetAlpha

        //UPDATE THE EMITTERS
        for (const id in this.lights) {
            const light = this.lights[id];

            if (light.isOn) {
                totalLight += light.intensity;

                if (light.sprite) {
                    light.sprite.alpha = 0.4;
                    light.sprite.position.set(light.x, light.y);

                    // scale based on radius
                    const scale = light.radius / 100;
                    light.sprite.scale.set(scale);
                }
            } else {
                if (light.sprite) {
                    light.sprite.alpha = 0;
                }
            }
        }
    }


}