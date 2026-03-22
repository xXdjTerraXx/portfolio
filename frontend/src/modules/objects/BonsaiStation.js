import { Sprite, Container } from "pixi.js"
import Plant from "./Plant"

//this is the zoomed out, default view of the bonsai area in the room
export default class BonsaiStation extends Container{
    constructor(app, roomEntitiesContainer, posX, posY, hitboxTexture, potTexture, trunkTexture, foliageTexture, bloomsTexture, growLightTexture, switchOnTexture, switchOffTexture, lightBeamTexture, newShading, Plant2Texture, growLightInitOnOrOff){
        super()
        this.label = 'bonsai_station_container'
        this.app = app
        this.roomEntitiesContainer = roomEntitiesContainer
        this.x = posX
        this.y = posY

        //the initial state of the growlight - 'on' || 'off'
        this.growLightInitOnOrOff = growLightInitOnOrOff

        this.hitbox = new Sprite(hitboxTexture)
        this.hitbox.alpha = 0
        this.hitbox.label = 'bonsai_station_hitbox'

        this.bonsai = new Bonsai(potTexture, trunkTexture, foliageTexture, bloomsTexture, 15, 0, this.roomEntitiesContainer)

        this.growLight = new GrowLight(growLightTexture,lightBeamTexture, -34, -3, this.roomEntitiesContainer)
        
        const initialSwitchTexture = switchOnTexture
        this.lightSwitch = new LightSwitch(initialSwitchTexture, -33, 77, switchOnTexture, switchOffTexture)

        //the small plant that sits by the tv
        this.plantObject2 = new Sprite(Plant2Texture)
        this.plantObject2.label = "plant_2"
        this.plantObject2.position.set(93,55)

        this.newShadingSprite = new Sprite(newShading)
        this.newShadingSprite.label = "new_shading"
        this.newShadingSprite.position.set(-33,-3)

        this.addChild(this.hitbox, this.bonsai, this.plantObject2, this.growLight, this.newShadingSprite, this.lightSwitch)
        this.roomEntitiesContainer.addChild(this)
        
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
    constructor(growLightTexture, lightBeamTexture, posX, posY, roomEntitiesContainer){
        super()
        this.label = 'grow_light_container'
        this.growLightSprite = new Sprite(growLightTexture)
        this.growLightSprite.position.set(0)
        
        this.lightBeamSprite = new Sprite(lightBeamTexture)
        this.lightBeamSprite.position.set(0)
        this.x = posX
        this.y = posY
        this.roomEntitiesContainer = roomEntitiesContainer

        this.addChild(this.growLightSprite, this.lightBeamSprite)
        this.roomEntitiesContainer.addChild(this)


    }
}

class LightSwitch extends Sprite{
    constructor(defaultTexture, xPos, yPos, switchOffTexture, switchOnTexture){
        super(defaultTexture)
        this.position.set(xPos, yPos)
        this.eventMode = 'static'
        this.on('pointerdown', this.handleClick)
        this.switchIsOn = false
        this.switchOffTexture = switchOffTexture
        this.switchOnTexture = switchOnTexture
    }

    handleClick = () => {
        this.switchIsOn = !this.switchIsOn
        if(this.switchIsOn)this.texture = this.switchOffTexture
        else this.texture = this.switchOnTexture
    }
}