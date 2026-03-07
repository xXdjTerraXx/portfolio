import AnimatedObject from "../base_classes/AnimatedObject"
import { BlurFilter } from "pixi.js"
import * as TWEEN from "@tweenjs/tween.js"

export default class NotesBoard extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer, setNotesOverlayFunction){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.sprite.label = "notes_board"
        this.sprite.interactive = true
        this.sprite.on("click", this.handleClick)
        this.setNotesOverlayFunction = setNotesOverlayFunction
    }
    
    handleClick = () => {
            console.log("notes board clicked!!!", this.app)
            
            const blurFilter = new BlurFilter()
            blurFilter.blur = 0
            this.roomEntitiesContainer.filters = [blurFilter]
            const blurTween = new TWEEN.Tween(blurFilter)
            blurTween.to({blur: 10}, 400)
            blurTween.easing(TWEEN.Easing.Quadratic.InOut)
            blurTween.start()
            blurTween.onComplete(() => {
                this.setNotesOverlayFunction()
            })
    }

    //this is for closing the notes board when user clicks something other than a note
    handleOffClick = () => {

    }
}