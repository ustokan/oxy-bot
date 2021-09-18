const Listener = require('../../structures/Listener');

module.exports = class extends Listener {
    constructor() {
        super('ReadyListener', {
            event: 'ready'
        });
    }

    async run(client) {
        client.user.setPresence({
            status: 'idle',
            activities: [{
                name: `${process.env.BOT_PREFIX}help`,
                type: 'WATCHING'
            }]
        });

        setInterval(() => {
            client.guilds.cache.get('817401465302810676').members.fetch();
        }, 60000);
    }
}