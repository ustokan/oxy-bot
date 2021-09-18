const { Client } = require('discord.js');

module.exports = class extends Client {
    constructor(props) {
        super(props);
    }

    async start() {
        await this.login(process.env.DISCORD_TOKEN);
    }
}