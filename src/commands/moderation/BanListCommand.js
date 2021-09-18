const Command = require('../../structures/Command');
const {
    MessageEmbed,
    Permissions
} = require('discord.js');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'ban-list',
            brief: 'список банов на сервере',
            description: 'Показать список банов',
            category: 'Модерация'
        });
    }

    async run(ctx) {
        if (!ctx.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
            return ctx.error('У вас нет права `Бан Участников`');

        const bans = await ctx.guild.bans.fetch();

        let emb = new MessageEmbed().setTitle('Список банов')

        let page = 1;
        let maxPages = 1;
        let embeds = [emb];

        bans.each(ban => {
            if (emb.fields.length >= 20) {
                page++;
                maxPages++;
                emb = new MessageEmbed().setTitle('Список банов');
            }

            emb.addField(`Участник ${ban.user.tag} (ID: ${ban.user.id})`, `Причина: ${ban.reason}`);
            embeds[page-1] = emb;
        });

        embeds[0].setFooter(`Страница 1 из ${maxPages}`);

        await ctx.send({ embeds: [embeds[0]] });

        // Потом доделать
    }
}