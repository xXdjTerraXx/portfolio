//this route is for the personal status feature which is basically like a little mini tweet
const express = require('express')
const router = express.Router()
const supabase = require('../services/supabaseClient')

router.get('/', async (req, res) => {

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('z_index', { ascending: true })

  if (error) {
    console.error(error)
    return res.status(500).json({ error: "Database error" })
  }

  res.json(data)
})

router.post('/', async (req, res) => {

  const {
    text,
    note_type,
    color,
    pos_x,
    pos_y,
    rotation,
    z_index
  } = req.body

  const { data, error } = await supabase
    .from('notes')
    .insert([
      { text, note_type, color, pos_x, pos_y, rotation, z_index }
    ])
    .select()

  if (error) {
    console.error(error)
    return res.status(500).json({ error: "Insert failed" })
  }

  res.json(data)
})

module.exports = router