const { MessageEmbed } = require('discord.js');

module.exports = class {
    constructor(options = {}) {
        this.name = options.name;
        this.brief = options.brief || 'помощь не указана';
        this.description = options.name || 'Помощь для команды не указана';
        this.category = options.category || 'Другое';
        this.aliases = options.aliases || [];
        this.guildOnly = options.guildOnly || false;
        this.minArgs = options.minArgs || 0;
        this.usage = options.usage || 'Не указано';
        this.examples = options.examples || 'Не указано';
    }

    getHelp() {
        return new MessageEmbed()
            .addField('', `\`${process.env.BOT_PREFIX}\`\n${this.description}`)
            .addField('Псевдонимы', this.aliases.length ? this.aliases.join(', ') : 'Не указано', true)
            .addField('Использование', this.usage.replace(/{p}/g, process.env.BOT_PREFIX), true)
            .addField('Примеры', this.examples.replace(/{p}/g, process.env.BOT_PREFIX), true)
    }
}