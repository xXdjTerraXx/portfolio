//this route is for the personal status feature which is basically like a little mini tweet
const express = require('express')
const router = express.Router()
const supabase = require('../services/supabaseClient')

router.get('/', async (req, res, next) => {
    const { data, error } = await supabase
    .from("personal_status")
    .select("*")
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

    if (error){
        console.error(error)
        return res.status(500).json({ error: "Database error" })
    }

    res.json(data)
})

router.post('/', async(req, res, next) => {
    const { text } = req.body
    
    const { data, error } = await supabase
        .from('personal_status')
        .insert([{ text }])
        .select()
    if(error){
        console.error(error)
        res.status(500).json({ error: 'Database error' })
    }

    res.json(data)

})
module.exports = router