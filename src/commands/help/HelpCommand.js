const Command = require('../../structures/Command');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'help',
            brief: 'помощь по боту',
            description: 'Помощь по боту или команде',
            aliases: ['h', 'п', 'помощь'],
            usage: '{p}help <команда>',
            examples: '{p}help ping',
            category: 'Помощь'
        });
    }

    async run(ctx) {
        const p = process.env.BOT_PREFIX;
        if (!ctx.args[0]) {
            ctx.send({
                embeds: [
                    new MessageEmbed().setTitle('Помощь')
                        .setDescription(`Для отображения списка модулей напишите \`${p}modules\`\nДля отображения списка команд в модуле используйте \`${p}modules <модуль>\`\nДля отображения помощи по команде используйте \`${p}help <команда>\` или \`${p}<команда> ?\``)
                ]
            });
        } else {
            const command = ctx.client.commands
                .find(c => c.info.name === ctx.args[0].toLowerCase()
                    || c.info.aliases.includes(ctx.args[0].toLowerCase()));
            if (!command)
                return ctx.error('Команда не найдена');

            ctx.send({ embeds: [command.getHelp().setTitle(`Помощь для ${ctx.args[0]}`)] });
        }
    }
}