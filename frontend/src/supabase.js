//this file inits the supabase auth client

import { createClient } from '@supabase/supabase-js'

const supabaseURL = `${process.env.SUPABASE_URL}`
const supabasePublishableKey = `${process.env.SUPABASE_PUBLISHABLE_KEY}`
export const supabaseClient = createClient(supabaseURL,supabasePublishableKey)
console.log("supabase client initialized...")