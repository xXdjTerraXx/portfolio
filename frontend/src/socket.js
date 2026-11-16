import { io } from 'socket.io-client'
import { supabaseClient } from './supabase'

//this io method has an optional second options arg where u can pass auth
const socket = io(
    `${process.env.API_BASE_URL}`, 
    { 
        auth: async (callback) => { //<--auth object has to be a func w callback
            try{
                const sessionData = await supabaseClient.auth.getSession()
                callback({token: sessionData.data.session?.access_token ?? null})
            }
            catch(err){
                console.error("something went wrong connecting to socket t-t",err)
                callback({token: null})
            }
        } 
    }
)

export default socket