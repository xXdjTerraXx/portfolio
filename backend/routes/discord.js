const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    console.log('request incoming...')
    let guild = client.guilds.cache.get(`${process.env.GUILD_ID}`);
    let member = guild.members.cache.get(`${process.env.MY_USER_ID}`);
            
    if (member && member.presence) {
        const isOnline = member.presence.status == 'online' ? true : false;
        res.json({isOnline, username: member.displayName});
        console.log(isOnline, 'askljdhfas')}           
})

module.exports = router