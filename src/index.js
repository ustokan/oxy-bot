const Client = require('./structures/Client');

new Client({
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_TYPING', 'GUILD_MESSAGE_TYPING', 'GUILD_INTEGRATIONS',
        'GUILD_VOICE_STATES'
    ],
    partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'USER', 'REACTION']
}).start();