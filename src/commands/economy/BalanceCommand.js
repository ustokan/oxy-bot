const Command = require('../../structures/Command');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'balance',
            brief: 'баланс пользователя',
            description: 'Показать баланс пользователя',
            aliases: ['bal', 'баланс', 'бал'],
            category: 'Экономика'
        });
    }

    async run(ctx) {
        const user = ctx.mentions.users.first()
            || ctx.client.users.cache.get(ctx.args[0])
            || ctx.author;

        const data = await ctx.client.db.getUserData(user.id);
        if (!data)
            return ctx.error('Пользователь не верифицирован');

        ctx.send({
            embeds: [
                new MessageEmbed().setTitle(`Баланс ${user.tag}`)
                    .setDescription(`${data.Balance || 0} ${process.env.BOT_CURRENCY}`)
                    .setThumbnail(data.RobloxAvatar)
            ]
        })
    }
}