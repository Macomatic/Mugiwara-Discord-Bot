const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wanted')
        .setDescription('Makes a wanted poster with the persons pfp')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The @ of the discord person')
                .setRequired(true)),
    async execute(interaction) {

        const person = interaction.options.getUser('user');

        // api call
        const url = 'https://api.popcat.xyz/wanted?image=https://cdn.discordapp.com/avatars/' + person.id + '/' + person.avatar;
        interaction.reply(url);

    },
};