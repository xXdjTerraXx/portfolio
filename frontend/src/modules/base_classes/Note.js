import { DropShadowFilter } from "pixi-filters";
import { Container, Sprite, Text, TextStyle } from "pixi.js";

export default class Note extends Container{
    constructor(texture, shadingTexture, text, x_pos, y_pos, zIndex, noteType, color, rotation, timestamp, noteFont){
        super()
        this.noteTexture = texture
        this.shadingTexture = shadingTexture
        this.text = text
        this.x = x_pos
        this.y = y_pos
        this.pivot.x = this.width / 2
        this.pivot.y = this.height / 2
        //degrees to radians
        this.rotation = rotation * (Math.PI / 180)
        // this.zIndex = zIndex
        this.noteType = noteType
        this.tint = color
        
        this.timestamp = timestamp
        this.noteFont = noteFont
        this.initNote()

        //this is for stopping clicking notes from closing the overlay - only clicking
        //directly on the transparent back panel should close it
        this.eventMode = 'static'
        this.on("pointerdown", (e) => {
            e.stopPropagation()
        })
    }

    initNote = () => {
        this.noteSprite = new Sprite(this.noteTexture)
        this.noteSprite.label = "note"
        this.noteSprite.filters = [new DropShadowFilter({alpha:1, offset:{ y:6}})]

        const shadingSprite = new Sprite(this.shadingTexture)
        shadingSprite.label = "note_shading"
        
        const noteTextStyle = new TextStyle({
            fontFamily: "NotesFont",
            fontSize: 14,
            fill: "#2b2b2b",
            align: "left",
            wordWrap: true,
            wordWrapWidth: 110,
            lineHeight: 18,
            letterSpacing: 0.5,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowAlpha: 0.15,
            dropShadowDistance: 1,
            dropShadowBlur: 1
        })
        const notesText = new Text(this.text, noteTextStyle)
        notesText.x = 18
        notesText.y = 18

        this.addChild(this.noteSprite, notesText, shadingSprite)
    }
}