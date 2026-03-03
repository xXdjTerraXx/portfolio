import AnimatedObject from "../base_classes/AnimatedObject"
import { GlowFilter } from "pixi-filters"
import * as TWEEN from "@tweenjs/tween.js"

export default class Journal extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.sprite.label = "journal"
        this.sprite.interactive = true
        this.sprite.on("click", this.handleClick)
        this.sprite.on('pointerover', this.handleJournalMouseIn)
        this.sprite.on('pointerout', this.handleJournalMouseOut)

        this.sprite.animationSpeed = 0.3
    }
    
     

    handleJournalMouseIn = () => {
            if(this.desktopIsDisplaying == false){
    
            //add outline effect
            this.sprite.filters = [new GlowFilter({alpha: 0.2, color: '#bbb4f3'})];
            //display hovering arrow
            this.app.stage.addChild(this.selectionArrow.sprite)

             // switch textures to the open animation
            this.sprite.textures = this.sprite_sheet.animations.open
            this.sprite.loop = false   
            this.sprite.play()
            console.log("yeeeeeep")
        }
    }
    
    handleJournalMouseOut = () => {
    if (this.desktopIsDisplaying == false) {

        // Remove outline effect from this
        this.sprite.filters = null;
        // Remove hovering arrow
        this.app.stage.removeChild(this.selectionArrow.sprite);

        // ---- play reverse open animation once ----
        const openTextures = this.sprite_sheet.animations.open;
        const reversedOpen = [...openTextures].reverse(); // copy + reverse

        this.sprite.textures = reversedOpen;
        this.sprite.loop = false;
        this.sprite.gotoAndPlay(0);

        // when it finishes, go back to main (or whatever you want)
        this.sprite.once('complete', () => {
            this.sprite.textures = this.sprite_sheet.animations.main;
            this.sprite.loop = false;
            this.sprite.gotoAndStop(0);
        });
    }
}

    handleClick = () => {
            console.log("journal clicked!!!", this.app)
            
            // const blurFilter = new BlurFilter()
            // blurFilter.blur = 0
            // this.roomEntitiesContainer.filters = [blurFilter]
            // const blurTween = new TWEEN.Tween(blurFilter)
            // blurTween.to({blur: 10}, 400)
            // blurTween.easing(TWEEN.Easing.Quadratic.InOut)
            // blurTween.start()
            // blurTween.onComplete(() => {
            //     // this.setAquariumFunction()
            //     const desktopAlphaTween = new TWEEN.Tween(this.desktopContainer.children[0])
            //     desktopAlphaTween.to({alpha: 0}, 800)
            //     desktopAlphaTween.easing(TWEEN.Easing.Quadratic.InOut)
            //     desktopAlphaTween.start()
    
            //     const desktopTween = new TWEEN.Tween(this.desktopContainer)
            //     desktopTween.to({width: 722}, 200)
            //     desktopTween.easing(TWEEN.Easing.Quadratic.InOut)
            //     desktopTween.start()
                
            //     const iconsArray = this.desktopContainer.children[1].children
            //     iconsArray.forEach((sprite, index) => {
            //         const alphaTween = new TWEEN.Tween(sprite)
            //         alphaTween.to({alpha: 1}, 800)
            //         alphaTween.easing(TWEEN.Easing.Quadratic.InOut)
            //         alphaTween.start()
    
            //         if(sprite.label == 'power_icon'){
            //             const iconsContainerTween = new TWEEN.Tween(sprite) 
            //             iconsContainerTween.to({y: 200}, 700)
            //             iconsContainerTween.delay(200)
            //             iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
            //             iconsContainerTween.start()
    
            //             const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
            //             iconsContainerTweenBack.to({y: 130}, 400)
            //             iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                        
    
            //             iconsContainerTween.chain(iconsContainerTweenBack)
            //         }
            //         else{
            //             let endPos = (index * 2) * 20
            //             const iconsContainerTween = new TWEEN.Tween(sprite) 
            //             iconsContainerTween.to({y: endPos + (50 * Math.random()) }, 800 * Math.random())
            //             iconsContainerTween.delay((index * 20) + 100)
            //             iconsContainerTween.easing(TWEEN.Easing.Quadratic.In)
            //             iconsContainerTween.start()
    
            //             const iconsContainerTweenBack = new TWEEN.Tween(sprite) 
            //             iconsContainerTweenBack.to({y: endPos}, 300)
            //             iconsContainerTweenBack.easing(TWEEN.Easing.Quadratic.Out)
                        
            //             iconsContainerTween.chain(iconsContainerTweenBack)
            //         }
            //     })
    
            //     const iconsContainerTween = new TWEEN.Tween(this.desktopContainer.children[1]) //tween the icons container
            //     iconsContainerTween.to({y: 350}, 1000)
            //     iconsContainerTween.easing(TWEEN.Easing.Quadratic.InOut)
            //     iconsContainerTween.start()
            // })
            // this.setDisplayDesktop()
    }
}