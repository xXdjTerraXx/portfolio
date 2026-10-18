import { Sprite } from "pixi.js";

class InfoBubble extends Sprite{
    constructor(texture, discordStatus){
        super(texture)
        this.discordStatus = discordStatus
    }
}