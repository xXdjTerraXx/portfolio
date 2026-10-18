import { CRTFilter } from "pixi-filters"
import { TextStyle, Text, Graphics, Sprite, Texture, Container } from "pixi.js"

export default class RokuScene{
    constructor(tv_stand_sprite, x, y, scaleX, scaleY, color, pngAssets, tv_container, lastPlayedJson){
        
        this.lastPlayedJson = lastPlayedJson
        this.tv_stand_sprite = tv_stand_sprite
        this.x = x
        this.y = y
        this.color = color
        this.pngAssets = pngAssets
        this.tv_container = tv_container
        
        this.mask = new Sprite(Texture.WHITE);
        this.mask.width = 140;
        this.mask.height = 60;
        this.mask.position.set(184, 220)
        this.mask.label = 'mask'   

        this.crtFilter = new CRTFilter()

        this.background = new Sprite(this.pngAssets.TVBackground)
        this.background.x = 181
        this.background.y = 215
        this.background.label = 'background'

        this.glareForeground = new Sprite(this.pngAssets.TVGlare)
        this.glareForeground.x = 181
        this.glareForeground.y = 215
        this.glareForeground.label = 'foreground_glare'
    
        // 2 sprites for BACKGROUND, both children of backgroundContainer
       this.backgroundParallaxSprite1 = new Sprite(this.pngAssets.RokuCityParallaxBackground);
       this.backgroundParallaxSprite1X_start = -50
       this.backgroundParallaxSprite1.x = 50;
       this.backgroundParallaxSprite1.y = 220;

        this.backgroundParallaxSprite2 = new Sprite(this.pngAssets.RokuCityParallaxBackground);
        this.backgroundParallaxSprite2X_start =this.backgroundParallaxSprite1.x + (this.backgroundParallaxSprite1.width)
        this.backgroundParallaxSprite2.x = this.backgroundParallaxSprite2X_start
        this.backgroundParallaxSprite2.y = 220;

        // 2 sprites for FOREGROUND, both children of foregroundContainer
        this.foregroundParallaxSprite1 = new Sprite(this.pngAssets.RokuCityParallaxForeground);
        this.foregroundParallaxSprite1X_start = -50
        this.foregroundParallaxSprite1.x = 50;
        this.foregroundParallaxSprite1.y = 220;

        this.foregroundParallaxSprite2 = new Sprite(this.pngAssets.RokuCityParallaxForeground);
        this.foregroundParallaxSprite2X_start =this.foregroundParallaxSprite1.x + (this.foregroundParallaxSprite1.width)
        this.foregroundParallaxSprite2.x = this.foregroundParallaxSprite2X_start
        this.foregroundParallaxSprite2.y = 220;


        // 2 containers, 1 for BACKGROUND and 1 for FOREGROUND
        this.backgroundContainer = new Container()
        this.backgroundContainer.position.set(0,0)
        this.backgroundContainer.scale.set(scaleX, scaleY)
        this.backgroundContainer.mask = this.mask
        this.backgroundContainer.addChild(this.backgroundParallaxSprite1, this.backgroundParallaxSprite2)

        this.foregroundContainer = new Container()
        this.foregroundContainer.position.set(0,0)
        this.foregroundContainer.scale.set(scaleX, scaleY)
        this.foregroundContainer.mask = this.mask
        this.foregroundContainer.addChild(this.foregroundParallaxSprite1, this.foregroundParallaxSprite2)

        //then, main container that both bg and fg containers get added to and 
        //that gets added as this scene to the TV
        this.container = new Container()
        this.container.label = "roku_scene _main_container"
        
        this.container.filters = [this.crtFilter]
        this.container.position.set(x, y)
        this.container.addChild(this.background, this.mask, this.backgroundContainer, this.foregroundContainer, this.glareForeground)
    }

    animate = () => {
        //animate crt filter
        this.crtFilter.time += 0.1

        //BACKGROUND STUFF
        const backgroundSpeed = 0.1;

        this.backgroundParallaxSprite1.x -= backgroundSpeed;
        this.backgroundParallaxSprite2.x -= backgroundSpeed;

        // when one goes fully off screen (left), move it to the right of the other
        if (this.backgroundParallaxSprite1.x + this.backgroundParallaxSprite1.width < 0) {
            this.backgroundParallaxSprite1.x = this.backgroundParallaxSprite2.x + this.backgroundParallaxSprite2.width;
        }

        if (this.backgroundParallaxSprite2.x + this.backgroundParallaxSprite2.width < 0) {
            this.backgroundParallaxSprite2.x = this.backgroundParallaxSprite1.x + this.backgroundParallaxSprite1.width;
        }

        const foregroundSpeed = 0.3;

        this.foregroundParallaxSprite1.x -= foregroundSpeed;
        this.foregroundParallaxSprite2.x -= foregroundSpeed;

        // when one goes fully off screen (left), move it to the right of the other
        if (this.foregroundParallaxSprite1.x + this.foregroundParallaxSprite1.width < 0) {
            this.foregroundParallaxSprite1.x = this.foregroundParallaxSprite2.x + this.foregroundParallaxSprite2.width;
        }

        if (this.foregroundParallaxSprite2.x + this.foregroundParallaxSprite2.width < 0) {
            this.foregroundParallaxSprite2.x = this.foregroundParallaxSprite1.x + this.foregroundParallaxSprite1.width;
        }
    }

    load = async () => {
        console.log('loading')
    }
}