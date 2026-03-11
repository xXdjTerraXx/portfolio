const supabase = require('../services/supabaseClient')

exports.saveMessage = async function(message){
    const { username, text, user_ip } = message
    console.log('NEW MESSAGE WOO WOOP', message)

    const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      { username, text, user_ip }
    ])
    .select()

     if (error) {
        console.error("SUPABASE ERROR:", error)
        return
    }
    console.log('new message saved to db', data)

    return data[0]
}

exports.getRecentMessages = async function(){
    const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .limit(50)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: "Database error" })
  }

  console.log("retrieved chat messages from db: ", data)

  return data
}