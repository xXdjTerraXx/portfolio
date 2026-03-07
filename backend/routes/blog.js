const express = require('express')
const router = express.Router()
const supabase = require('../services/supabaseClient')

router.get('/', async (req, res, next) => {
    const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false})

    if (error){
        console.error(error)
        return res.status(500).json({ error: "Database error" })
    }

    res.json(data)
})

module.exports = router