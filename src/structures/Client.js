const { Client, Collection } = require('discord.js');
const DatabaseService = require('../services/DatabaseService');
const LoadService = require('../services/LoadService')

module.exports = class extends Client {
    constructor(props) {
        super(props);

        this.commands = new Collection();
        this.listeners = new Collection();

        this.db = new DatabaseService();
    }

    async start() {
        await this.db.start();

        await LoadService.loadCommands(this);
        await LoadService.loadListeners(this);

        await this.login(process.env.DISCORD_TOKEN);
    }
}