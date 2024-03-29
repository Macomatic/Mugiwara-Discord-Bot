const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clown')
        .setDescription('Make fun of this person')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The @ of the discord person')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const person = interaction.options.getUser('user');

        // api call
        const url = 'https://api.popcat.xyz/clown?image=https://cdn.discordapp.com/avatars/' + person.id + '/' + person.avatar;
        interaction.editReply(url);

    },
};