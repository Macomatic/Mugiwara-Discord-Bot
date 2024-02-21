const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drakememe')
        .setDescription('Creates the drake meme')
        .addStringOption(option => 
            option.setName('text1')
                .setDescription('The text that drake says no to')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('text2')
                .setDescription('The text that drake says yes to')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const text1 = encodeURIComponent(interaction.options.getString('text1'));
        const text2 = encodeURIComponent(interaction.options.getString('text2'));

        // api call
        const url = 'https://api.popcat.xyz/drake?text1=' + text1 + '&text2=' + text2;
        interaction.editReply(url);

    },
};