
export default class SceneManager {
    constructor(statesDict){
        this.statesDict = statesDict
        this.currentState = null
        // this.currentState = initialState
        // this.currentState.onEnter()
    }

    setState = (newState) => {
        console.log(`state changing: ${this.currentState} to ${newState}`)
        if(this.currentState)this.currentState.onExit()
        this.currentState = this.statesDict[newState]
        this.currentState.onEnter()
    }

    update = (deltaTime) => {
        this.currentState.update(deltaTime)
    }
}