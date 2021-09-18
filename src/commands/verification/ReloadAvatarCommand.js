const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'reload-avatar',
            brief: 'перезагрузить аватар',
            description: 'Перезагрузить ваш аватар (если вы его изменяли)',
            category: 'Верификация'
        });
    }

    async run(ctx) {
        const data = await ctx.client.db.getUserData(ctx.author.id);
        if (!data)
            return ctx.error('Вы ещё не проходили верификацию');

        ctx.send({ content: 'Аватар изменен' });

        let avatarRequest = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${data.RobloxID}&size=250x250&format=Png&isCircular=false`);
        let avatarJson = await avatarRequest.json();
        ctx.client.db.collection('users').updateOne({ UserID: data.UserID }, {
            $set: {
                RobloxAvatar: avatarJson.data[0].imageUrl
            }
        });
    }
}