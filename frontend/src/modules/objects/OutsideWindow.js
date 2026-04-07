
import { Container, Sprite } from "pixi.js";
import AnimatedObject from "../base_classes/AnimatedObject";

export default class OutsideWindow extends AnimatedObject{
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitbox, label, windowAssets, weatherJson){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitbox, label)
        this.weatherJson = weatherJson
        //the asset bundle with all of the assets needed for rendering window
        this.windowAssets = windowAssets

        //for the window, this.sprite is the animated portion that sits behind the window
        //glass, frame, and curtains. it changes based on weather data from api.
        this.sprite.label = 'current_weather_animation'
        this.sprite.scale.set(.20, .20)
        this.sprite.alpha = 0.38
        this.sprite.position.set(71,68.5)

        //create the mask
        this.dynamicAssetsMask = new Sprite(this.windowAssets.WindowMask)
        this.dynamicAssetsMask.label = "dynamic_window_assets_mask"
        this.dynamicAssetsMask.position.set(-64, -64.5)

        //===================================
        //====       containers         =====
        //===================================
        //this container holds everything except the weather animation, which sits behind this.
        //both are children of the main "this.mainContainer"
        this.staticWindowAssetsContainer = new Container()
        this.staticWindowAssetsContainer.label = 'static_window_assets_container'
        this.staticWindowAssetsContainer.position.set(-69,-65)

        //this container holds 1) the sky gradient and 2)the animated weather sprite
        //it is masked by this.dynamicAssetsMask
        this.dynamicWindowAssetsContainer = new Container()
        this.dynamicWindowAssetsContainer.label = 'dynamic_window_assets_container'
        this.dynamicWindowAssetsContainer.position.set(-69,-65)
        this.dynamicWindowAssetsContainer.mask = this.dynamicAssetsMask
        //===================================
        //====      static assets       =====
        //===================================
        //window frame
        this.windowFrameAndCurtainRod = new Sprite(this.windowAssets.WindowFrameAndRod)
        this.windowFrameAndCurtainRod.label = 'window_frame_and_curtain_rod'
        this.windowFrameAndCurtainRod.position.set(0,0)
        //glass
        this.glass = new Sprite(this.windowAssets.WindowGlass)
        this.glass.label = "window_glass"
        this.glass.position.set(0,0)
        //curtains
        this.curtains = new Sprite(this.windowAssets.WindowCurtains)
        this.curtains.label = "window_curtains"
        this.curtains.position.set(0,0)

        //===================================
        //====      dynamic assets      =====
        //===================================
        //gradient sky
        //at sunset start gradient sky starts here
        this.gradientSkyStartY = -82
        //and at end ends here
        this.gradientSkyEndY = 11
        this.gradientSky = new Sprite(this.windowAssets.WindowSunsetSkyGradient)
        this.gradientSky.label = "window_gradient_sky"
        this.gradientSky.position.set(0,this.gradientSkyStartY)

        //===================================
        //====          append          =====
        //===================================
        //append everything
        this.dynamicWindowAssetsContainer.addChild(this.gradientSky, this.sprite)
        this.staticWindowAssetsContainer.addChild(this.glass, this.windowFrameAndCurtainRod, this.curtains)
        this.mainContainer.addChild(this.dynamicWindowAssetsContainer, this.staticWindowAssetsContainer, this.dynamicAssetsMask)

        this.app.ticker.add(this.update)
    }

    //this function just returns state!!
    getEnvironmentState = () => {
        const now = Date.now()

        const sunrise = this.weatherJson.sunrise * 1000
        const sunset = this.weatherJson.sunset * 1000

        // define active window (sunset -> night)
        // 30 min before
        const sunsetStart = sunset - (30 * 60 * 1000) 
        // 2 hours after
        const nightEnd = sunset + (2 * 60 * 60 * 1000) 

        const isWindowActive = now >= sunsetStart && now <= nightEnd

        // const weatherType = this.weatherJson.weather[0].main.toLowerCase()

        return {
            isWindowActive,
            sunsetStart,
            nightEnd,
            // weatherType
        }
    }

    // ===============================
    // SKY MOVEMENT (ONLY WHEN ACTIVE)
    // ===============================
    updateSkyPosition = (start, end) => {
        const now = Date.now()

        let progress = (now - start) / (end - start)
        progress = Math.max(0, Math.min(1, progress)) // clamp

        const range = this.gradientSkyEndY - this.gradientSkyStartY

        this.gradientSky.y =
            this.gradientSkyStartY + (progress * range)
    }

    // ===============================
    // CURTAINS + VISIBILITY
    // ===============================
    updateCurtainsAndVisibility = (env) => {
        // day → closed, sunset/night → open
        this.curtains.visible = !env.isWindowActive

        // only show sky + weather when active
        // this.dynamicWindowAssetsContainer.visible = env.isWindowActive
        //THIS IS JUST A QUICK FIX: CHANGE LATER:
        this.dynamicWindowAssetsContainer.visible = true
    }

    // ===============================
    // WEATHER (simple for now)
    // ===============================
    updateWeather = (env) => {
        // placeholder — expand later
        // you can swap animations here
    }

    // ===============================
    // MAIN UPDATE LOOP
    // ===============================
    update = () => {
        const env = this.getEnvironmentState()

        if (env.isWindowActive) {
            this.updateSkyPosition(env.sunsetStart, env.nightEnd)
        }

        this.updateCurtainsAndVisibility(env)
        this.updateWeather(env)
    }

}
