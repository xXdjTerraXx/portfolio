import { supabaseClient } from '../../supabase'

export async function handleFormSubmit(e){
    e.preventDefault()
    

    const formData = new FormData(e.target)

    const data = Object.fromEntries(formData.entries())
    const email = data.email
    const password = data.password
    try{
        const dataFromLogin = await supabaseClient.auth.signInWithPassword({email, password})
        console.log("login successful! ",dataFromLogin)
    }
    catch(err){
        createFormError(err)
        console.error(err)
    }
    
}

function createFormError(err){
    const errorContainer = document.querySelector('#error-container')
    //first clear errorContainer
    while(errorContainer.firstChild)errorContainer.removeChild(errorContainer.firstChild)
    //make a new error text and add it
    const errorTextEle = document.createElement("p") 
    errorTextEle.textContent = err.message
    errorTextEle.classList.add("error-text")
    errorContainer.append(errorTextEle)
}

export function showHideLoginContainer(){
    const loginContainer = document.querySelector("#login-container")
    loginContainer.hidden = !loginContainer.hidden
}