const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alert')
        .setDescription('Creates a iphone alert meme')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text that appears as an iphone notification')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const text = encodeURIComponent(interaction.options.getString('text'));

        // api call
        const url = 'https://api.popcat.xyz/alert?text=' + text;
        interaction.editReply(url);

    },
};