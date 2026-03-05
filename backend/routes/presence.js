const express = require('express')
const router = express.Router()

let presenceState = {
  presenceAppOnline: false,
  status: "offline",
  emoji: '❌',
  lastHeartbeat: null,
  sessionStart: null
}

//this is the route for the presence app to POST status, updating  
//the presenceState object that the frontend will later GET
router.post("/", (req, res) => {
  console.log(`updating presence to ${req.body.status}`)
  const apiKey = req.headers.authorization

  if (apiKey !== "Bearer Fairygirlterra1337!") {
    return res.status(403).json({ error: "Unauthorized" })
  }

  const { status, emoji, timestamp } = req.body

  const now = Date.now()

  // if previously offline, start new session
  if (!presenceState.presenceAppOnline) {
    presenceState.sessionStart = now
  }

  presenceState.presenceAppOnline = true
  presenceState.status = status
  presenceState.emoji = emoji
  presenceState.lastHeartbeat = now

  res.json({ success: true })
})

router.get("/", (req, res) => {
  const now = Date.now()

  // suto mark offline if no heartbeat in 60s
  if (
    presenceState.lastHeartbeat &&
    now - presenceState.lastHeartbeat > 60000
  ) {
    presenceState.presenceAppOnline = false
    presenceState.status = "offline"
  }
  console.log('DEBUG: heres the state being sent from backend get presence: ', presenceState)
  res.json(presenceState)
})

module.exports = router