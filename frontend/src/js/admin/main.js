import '../../styles/admin_style.css'
import { handleFormSubmit, showHideLoginContainer } from './login'
import { supabaseClient } from '../../supabase'

const loginContainer = document.querySelector("#login-container")
const dashboardContainer = document.querySelector('#dashboard-container')
const form = document.querySelector("form")
const logoutButton = document.querySelector('#logout-button')

document.body.addEventListener("click", showHideLoginContainer)
loginContainer.addEventListener("click",e => e.stopPropagation())
form.addEventListener("submit", e => handleFormSubmit(e))
logoutButton.addEventListener("click", () => supabaseClient.auth.signOut())

supabaseClient.auth.onAuthStateChange(toggleLoginSectionAndDashboard)



function toggleLoginSectionAndDashboard(data){
    
    if(data === "SIGNED_IN"){
        //hide login container
        loginContainer.hidden = true
        //unhide dashboard container
        dashboardContainer.hidden = false
        //remove event listener
        document.body.removeEventListener("click", showHideLoginContainer)
    }
    else {

    }
}