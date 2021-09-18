const Context = require('../structures/CommandContext');

module.exports = class {
    constructor(client, message) {
        this.client = client;
        this.message = message;
    }

    findCommand(commandName) {
        const command = this.client.commands.get(commandName);
        if (command) {
            return command;
        } else {
            return this.client.commands.find((c) => c.aliases.includes(commandName));
        }
    }

    async runCommand() {
        if (this.message.author.bot) return;
        if (this.message.guild?.id !== '817401465302810676') {
            return
        }

        let prefix = process.env.BOT_PREFIX;

        const prefixMention = new RegExp(`^<@!?${this.client.user.id}> `);
        prefix = this.message.content.match(prefixMention) ?
            this.message.content.startsWith(this.message.content.match(prefixMention)[0]) ?
                this.message.content.match(prefixMention)[0] : prefix : prefix;
        if (!this.message.content.startsWith(prefix)) return;

        const [cmd, ...args] = this.message.content.slice(prefix.length).trim().split(/ +/g);

        const command = this.findCommand(cmd);
        if (!command) return;

        if (args[0] === '?') {
            return this.message.channel.send({ embeds: [command.getHelp().setTitle('Помощь по данной команде')] });
        }

        const ctx = new Context(this.client, this.message, args);

        if (command.minArgs > args.length)
            return ctx.send({ embeds: [command.getHelp().setTitle('Недостаточно аргументов!')] })

        command.run(ctx).catch(err => console.error(err));
    }
}