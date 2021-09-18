const Listener = require('../../structures/Listener');
const CommandsService = require('../../services/CommandsExecutorService');

module.exports = class extends Listener {
    constructor() {
        super('MessageCreateListener', {
            event: 'messageCreate'
        });
    }

    run(client, message) {
        const executor = new CommandsService(client, message);
        executor.runCommand();
    }
}