const Command = require('../../structures/Command');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'ping',
            brief: 'задержка бота',
            description: 'Показать задержку бота',
            category: 'Утилиты'
        });
    }

    async run(ctx) {
        const msg = await ctx.send({
            embeds: [new MessageEmbed().setDescription('Подождите')]
        });

        msg.edit({
            embeds: [
                new MessageEmbed().setTitle('🏓 Понг!')
                    .setDescription(`**Я ответил вам за** \`${msg.createdTimestamp - ctx.message.createdTimestamp} мс\`\n**Задержка шлюза**: \`${ctx.client.ws.ping} мс\``)
            ]
        });
    }
}