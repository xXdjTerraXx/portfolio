import AnimatedObject from "../base_classes/AnimatedObject"


export default class NotesBoard extends AnimatedObject {
    constructor(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer){
        super(sprite_sheet, x_pos, y_pos, app, arrowSpriteSheet, roomEntitiesContainer, desktopContainer)
        this.sprite.label = "notes_board"
        this.sprite.interactive = true
        this.sprite.on("click", this.handleClick)
    }
    
  

    handleClick = () => {
            console.log("notes board clicked!!!", this.app)
            
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