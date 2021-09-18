const { MessageEmbed } = require('discord.js');

module.exports = class CommandContext {
    constructor(client, message, args) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.member = message.member;
        this.guild = message.guild;
        this.author = message.author;
        this.channel = message.channel;
        this.mentions = message.mentions;
    }

    async send(options) {
        return this.channel.send(options);
    }

    async error(text) {
        return this.send({
            embeds: [
                new MessageEmbed().setColor('RED').setDescription(`❌ ${text}`)
            ]
        });
    }

    async warning(text) {
        return this.send({
            embeds: [
                new MessageEmbed().setDescription(`⚠ ${text}`)
            ]
        });
    }

    async success(text) {
        return this.send({
            embeds: [
                new MessageEmbed().setDescription(`✅ ${text}`)
            ]
        });
    }
}