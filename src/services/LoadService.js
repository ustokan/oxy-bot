const path = require('path');
const glob = require('glob');
const BCommand = require('../structures/Command');
const BListener = require('../structures/Listener');

module.exports = class {
    constructor() {
        throw new Error(`Class LoadService cannot be initialized`)
    }

    static async loadCommands(client) {
        await glob(path.join(__dirname, '../commands/**/*.js'), {}, (err, files) => {
            if (err)
                return console.error(err);

            for (const file of files) {
                const Command = require(file);
                if (Command.prototype instanceof BCommand) {
                    const cmd = new Command();
                    client.commands.set(cmd.name, cmd);
                }
            }
        });
    }

    static async loadListeners(client) {
        await glob(path.join(__dirname, '../listeners/**/*.js'), {}, (err, files) => {
            if (err)
                return console.error(err);

            for (const file of files) {
                const Listener = require(file);
                if (Listener.prototype instanceof BListener) {
                    const listener = new Listener();
                    client.listeners.set(listener.name, listener);
                    client.on(listener.event, listener.run.bind(listener, client));
                }
            }
        });
    }
}