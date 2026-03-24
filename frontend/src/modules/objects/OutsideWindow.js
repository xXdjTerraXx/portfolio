
import AnimatedObject from "../base_classes/AnimatedObject";

export default class OutsideWindow extends AnimatedObject{
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitbox, label){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, hitbox, label)
        this.sprite.label = 'pixel_rain'
        this.sprite.scale.set(.20, .20)
        this.sprite.alpha = 0.38
    }
}