const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Ships 2 people together')
        .addUserOption(option => 
            option.setName('person1')
                .setDescription('The @ of the discord person')
                .setRequired(true))
        .addUserOption(option => 
            option.setName('person2')
                .setDescription('The @ of the discord person')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const person1 = interaction.options.getUser('person1');
        const person2 = interaction.options.getUser('person2');

        // api call
        const url = 'https://api.popcat.xyz/ship?user1=https://cdn.discordapp.com/avatars/' + person1.id + '/' + person1.avatar + '&user2=https://cdn.discordapp.com/avatars/' + person2.id + '/' + person2.avatar;
        interaction.editReply(url);

    },
};