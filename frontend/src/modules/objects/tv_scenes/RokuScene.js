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
        
        this.background = new Sprite(this.pngAssets.TVBackground)
        this.background.x = 181
        this.background.y = 215
        this.background.label = 'background'

        this.glareForeground = new Sprite(this.pngAssets.TVGlare)
        this.glareForeground.x = 181
        this.glareForeground.y = 215
        this.glareForeground.label = 'foreground_glare'
    
       this.rokuCity = new Sprite(this.pngAssets.RokuCity);
       this.rokuCityX_start = -50
       this.rokuCity.x = 50;
       this.rokuCity.y = 220;


        this.secondRokuCity = new Sprite(this.pngAssets.RokuCity);
        this.secondRokuCityX_start =this.rokuCity.x - (this.rokuCity.width)
        this.secondRokuCity.x = this.secondRokuCityX_start
        this.secondRokuCity.y = 220;

        this.mask = new Sprite(Texture.WHITE);
        
        this.mask.width = 140;
        this.mask.height = 60;
        this.mask.position.set(184, 220)


        this.container = new Container()
        this.container.position.set(x, y)
        this.container.scale.set(scaleX, scaleY)
        this.rokuCity.mask = this.mask;
        this.secondRokuCity.mask = this.mask

        this.mask.label = 'mask'   

        this.crtFilter = new CRTFilter()
        this.container.filters = [this.crtFilter]
        this.container.addChild(this.background, this.mask,this.rokuCity, this.secondRokuCity, this.glareForeground )
        // this.container.addChild(this.text, this.spotifyLogo, this.background)

    }

    animate = () => {
    const speed = 0.1;

    this.rokuCity.x -= speed;
    this.secondRokuCity.x -= speed;

    //animate crt filter
    this.crtFilter.time += 0.1

    // when one goes fully off screen (left), move it to the right of the other
    if (this.rokuCity.x + this.rokuCity.width < 0) {
        this.rokuCity.x = this.secondRokuCity.x + this.secondRokuCity.width;
    }

    if (this.secondRokuCity.x + this.secondRokuCity.width < 0) {
        this.secondRokuCity.x = this.rokuCity.x + this.rokuCity.width;
    }
}

    load = async () => {
        console.log('loading')
    }
}