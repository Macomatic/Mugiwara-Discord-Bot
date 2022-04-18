const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Basic command that replies with pong'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};