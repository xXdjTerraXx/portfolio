import StaticObject from "../base_classes/StaticObject"

export default class Rug extends StaticObject{
    constructor(src, x_pos, y_pos, app, roomEntitiesContainer){
        super(src, x_pos, y_pos, app, roomEntitiesContainer)
        this.sprite.label = "rug"
    }   
}