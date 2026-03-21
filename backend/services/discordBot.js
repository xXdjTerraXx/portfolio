module.exports = function initDiscordBot(io) {
    const { Client, GatewayIntentBits } = require('discord.js');
    const { systemMessageColors } = require('../config/chatConfig');
    const chatController = require('../controllers/chatController');

    const client = new Client({
        intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
        ]
    });

    client.on('ready', () => {
        console.log(`🤖 Discord bot ready: ${client.user.tag}`);
    });

    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        // optional: only you
        if (message.author.id !== process.env.MY_USER_ID) return;

        if (!message.content.startsWith('!site')) return;

        const text = message.content.replace('!site ', '').trim();

        if (!text) return;

        console.log('📡 Discord → Site:', text);

        try {
            await chatController.processMessage({
                username: `${message.author.username} (discord)`,
                text,
                color: systemMessageColors.discordMessageTerra,
                type: 'discord'
            }, io);

        } catch (err) {
            console.error("Discord → Site message failed:", err);

            // optional: notify users something broke
            io.emit('system message', {
                user: 'system',
                text: 'discord bridge failed T-T',
                color: systemMessageColors.error
            });
        }
    });

    client.on('presenceUpdate', (oldPresence, newPresence) => {
        if (!newPresence || newPresence.userId !== process.env.MY_USER_ID) return;

        const status = newPresence.status;

        console.log('🔥 presence updated:', status);

        io.emit('presence update', { status });
    });

    client.login(process.env.BOT_TOKEN);
};