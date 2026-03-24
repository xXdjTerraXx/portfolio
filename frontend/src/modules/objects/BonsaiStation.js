import { Sprite, Container } from "pixi.js"
import Plant from "./Plant"

//this is the zoomed out, default view of the bonsai area in the room
export default class BonsaiStation extends Container{
    constructor(app, roomEntitiesContainer, posX, posY, hitboxTexture, potTexture, trunkTexture, foliageTexture, bloomsTexture, growLightTexture, switchOnTexture, switchOffTexture, lightBeamTexture, newShading, Plant2Texture, lightIsOn){
        super()
        this.label = 'bonsai_station_container'
        this.app = app
        this.roomEntitiesContainer = roomEntitiesContainer

        this.x = posX
        this.y = posY

        //the initial state of the growlight - 'on' || 'off'
        this.lightIsOn = lightIsOn

        this.hitbox = new Sprite(hitboxTexture)
        this.hitbox.alpha = 0
        this.hitbox.label = 'bonsai_station_hitbox'
        this.hitbox.interactive = true
        this.hitbox.on("click", this.handleClick)

        this.bonsai = new Bonsai(potTexture, trunkTexture, foliageTexture, bloomsTexture, 15, 0, this.roomEntitiesContainer)

        this.growLight = new GrowLight(growLightTexture, -34, -3, this.roomEntitiesContainer)
        
        this.lightBeam = new LightBeam(lightBeamTexture, -36, -2)

        this.lightSwitch = new LightSwitch(-33, 77, switchOffTexture, switchOnTexture, this, this.switchIsOn)

        //the small plant that sits by the tv
        this.plantObject2 = new Sprite(Plant2Texture)
        this.plantObject2.label = "plant_2"
        this.plantObject2.position.set(93,55)

        this.newShadingSprite = new Sprite(newShading)
        this.newShadingSprite.label = "new_shading"
        this.newShadingSprite.position.set(-33,-3)

        
        
    }

    init = () => {
        if(this.lightIsOn){
            this.addChild(this.hitbox, this.bonsai, this.plantObject2, this.lightSwitch.sprite, this.growLight, this.lightBeam, this.newShadingSprite)
        }
        else{
            this.addChild(this.hitbox, this.bonsai, this.plantObject2, this.lightSwitch.sprite, this.growLight)
        }
        this.roomEntitiesContainer.addChild(this)
    }

    handleClick = () => {
        console.log("CLICK")
    }

    handleTurnLightOff = () => {
        console.log("CLICKED SWITCH - OFF")
        this.lightIsOn = false
        this.removeChild(this.lightBeam, this.newShadingSprite)
    }

    handleTurnLightOn = () => {
        console.log("CLICKED SWITCH - ON")
        this.lightIsOn = true
        this.addChild(this.lightBeam, this.newShadingSprite)
    }
}


class Bonsai extends Container{
    constructor(potTexture, trunkTexture, foliageTexture, bloomsTexture, posX, posY, roomEntitiesContainer){
        super()
        this.x = posX
        this.y = posY
        this.roomEntitiesContainer = roomEntitiesContainer
        this.potSprite = new Sprite(potTexture)
        this.trunkSprite = new Sprite(trunkTexture)
        // this.foliageSprite = new Sprite(foliageTexture)
        this.bloomsSprite = new Sprite(bloomsTexture)
        this.label = 'bonsai_tree_container'

        this.potSprite.x = 0
        this.potSprite.y = 0
        this.trunkSprite.x = 0
        this.trunkSprite.y = 0
        this.bloomsSprite.x = 0
        this.bloomsSprite.y = 0
        this.addChild(this.potSprite, this.trunkSprite, this.bloomsSprite)
    }
}

class GrowLight extends Container{
    constructor(growLightTexture, posX, posY, roomEntitiesContainer){
        super()
        this.label = 'grow_light_container'
        this.growLightSprite = new Sprite(growLightTexture)
        this.growLightSprite.position.set(0)
        
        this.x = posX
        this.y = posY
        this.roomEntitiesContainer = roomEntitiesContainer

        this.addChild(this.growLightSprite)
        this.roomEntitiesContainer.addChild(this)
    }
}

class LightSwitch{
    constructor(xPos, yPos, switchOffTexture, switchOnTexture, bonsaiStationContainer, switchIsOn){
        //the initial state of the switch
        this.switchIsOn = switchIsOn
        
        this.switchOffTexture = switchOffTexture
        this.switchOnTexture = switchOnTexture

        this.sprite = new Sprite(this.switchIsOn ? this.switchOnTexture : this.switchOffTexture)
        this.sprite.position.set(xPos, yPos)
        this.sprite.eventMode = 'static'
        this.sprite.on('pointerdown', this.handleClick)
        this.bonsaiStationContainer = bonsaiStationContainer//the main container/parent object
    }

    handleClick = () => {
        this.switchIsOn = !this.switchIsOn
        if(this.switchIsOn === true){
            this.sprite.texture = this.switchOnTexture
            this.bonsaiStationContainer.handleTurnLightOn()
        }
        else if (this.switchIsOn === false){
            this.sprite.texture = this.switchOffTexture
            this.bonsaiStationContainer.handleTurnLightOff()
        }
    }
}

class LightBeam extends Sprite {
    constructor(texture, x, y){
        super(texture)
        this.position.set(x,y)
        this.label = "light_beam"
    }
}