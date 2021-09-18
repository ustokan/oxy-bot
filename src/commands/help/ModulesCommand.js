const Command = require('../../structures/Command');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'modules',
            brief: 'список команд',
            description: 'Показать список модулей или команд',
            aliases: ['mod', 'модули', 'мод'],
            usage: '{p}modules <модуль>',
            examples: '{p}modules Утилиты',
            category: 'Помощь'
        });
    }

    async run(ctx) {
        const p = process.env.BOT_PREFIX;

        let commands = ctx.client.commands;
        const sorted = commands.array()
            .sort((p, c) => p.category > c.category ? 1 : p.name > c.name &&
            p.category === c.category ? 1 : -1);
        let categories = [];

        await sorted.forEach(command => {
            const category = command.category;
            if (!categories.includes(category)) categories.push(category);
        });


        if (!ctx.args[0]) {
            const emb = new MessageEmbed().setTitle('Список модулей')
                .setDescription(`Для помощи по модулю напишите \`${p}modules <модуль>\`. Примеры: \`${p}module Утилиты\`\n\n`)

            categories.forEach(category => {
                emb.setDescription(`${emb.description} ${category}\n`)
            });

            ctx.send({
                embeds: [emb]
            });
        } else {
            const ct = categories.find(c => c.toLowerCase() === ctx.args.join(' ').toLowerCase());
            if (!ct)
                return ctx.error('Модуль не найден')

            const emb = new MessageEmbed()
                .setTitle(`Список команд модуля ${ct}`)
                .setDescription(`Для помощи по команде напишите \`${p}help <команда>\` или \`${p}команда ?\`. Примеры: \`${p}help ping\`, \`${p}ping ?\`\n\n`);

            commands = commands.filter(c => c.category === ct);
            commands.forEach(cmd => {
                emb.setDescription(`${emb.description}\`${p}${cmd.name}\` - **${cmd.brief}**\n`)
            });

            ctx.send({ embeds: [emb] });
        }
    }
}