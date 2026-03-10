const express = require('express')
const router = express.Router()
const supabase = require('../services/supabaseClient')

router.get('/', async (req, res) => {

  const { data, error } = await supabase
    .from('chat_messages')
    .select('50')
    .order('createdAt', { ascending: false })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: "Database error" })
  }

  res.json(data)
})

router.post('/',async (req, res) => {
    const { username, message } = req.body

    const { data, error } = await supabase
    .from('chat_messages')
    .insert([
      { username, message }
    ])
    .select()

    if(error)res.status(500).json({message: "Database error"})
    
    else res.json(data)
})

module.exports = router