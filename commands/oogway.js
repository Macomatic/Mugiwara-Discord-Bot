const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oogway')
        .setDescription('Makes an oogway meme')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('Text to add to oogway meme')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const text = interaction.options.getString('text');
        const params = encodeURIComponent(text);

        // api call
        const url = 'https://api.popcat.xyz/oogway?text=' + params;
        interaction.editReply(url);

    },
};