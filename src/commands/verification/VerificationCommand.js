const Command = require('../../structures/Command');
const {
    MessageEmbed
} = require('discord.js');
const utils = require('../../utils/Random');

module.exports = class extends Command {
    constructor() {
        super({
            name: 'verify',
            brief: 'Roblox верификация',
            description: 'Roblox верификация',
            category: 'Верификация'
        });
    }

    async run(ctx) {
        const verify = await ctx.client.db.collection('verifications')
            .findOne({
                UserID: `${ctx.author.id}`
            });

        if (verify)
            return ctx.error('Вы уже верифицированы');

        const code = utils.randomString(10).toUpperCase();

        let err = false;
        await ctx.author.send({
            embeds: [
                new MessageEmbed().setTitle('Как пройти верификацию')
                    .setDescription('Для интеграции вашего профиля Roblox с нашим ботом вам необходимо пройти верификацию\n\n**Обратите внимание! Верификация доступна только на ПК и ноутбуках!**')
                    .addField('Инструкция', `1. Зайдите в [**игру**](https://www.roblox.com/games/7105523074) (кликабельно)\n2. В 1 поле с именем "Ваш ID" введите \`${ctx.author.id}\`\n3. В поле "Ваш код" введите \`${code}\`\n4. Если всё верно, кнопка окрасится в зелёный и вам придёт сообщение в ЛС об успешной верифицации, если что-то неправильно, то кнопка окрасится в красный и будет показывать ошибку в течении 4 секунд\n\n**Никому не сообщайте все эти данные**`)
                    .addField('Что делать при ошибке', '- Если вы получили ошибку **ошибка сервера**, то сообщите об этом в ЛС <@431916398361706496>\n- Если вы получили ошибку **ID не найден**: проверьте правильность введенных данных и данных в сообщении, если всё совпадает, то пропишите команду верификации ещё раз и введите новые данные\n- Если вы получили ошибку **Коды не совпадают**: проверьте правильность введенных данных и данных в сообщении, если всё совпадает, то не надо пытаться взломать\n- Если вы получили ошибку **Не удалось выдать роль**: напишите в канал помощи об этом')
                    .addField('Данные', `ID: \`${ctx.author.id}\`\nКод: \`${code}\``)
                    .setFooter('Создано с ❤ IOST')
            ]
        }).catch(e => { err = true; return ctx.error('Я не могу отправить вам в ЛС инструкции по верификации'); });
        if (err) return;

        if (ctx.channel.type !== 'DM') ctx.success('Инструкция по верификации отправлена вам в ЛС, если возникли вопросы, то пишите в канал помощи');

        await ctx.client.db.collection('verifications').insertOne({
            UserID: `${ctx.author.id}`,
            Code: code
        });
    }
}