const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('morsecode')
        .setDescription('Translates text to morse code')
        .addStringOption(option => 
            option.setName('text')
                .setDescription('The text to be translated')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const text = encodeURIComponent(interaction.options.getString('text'));

        // api call
        const url = 'https://api.popcat.xyz/texttomorse?text=' + text;
        fetch(url)
            .then(response => response.json())
            .then(json => {
                const translated = interaction.options.getString('text') + '\n' + json.morse;
                interaction.editReply(translated);
            })
            .catch((error) => {
                interaction.editReply(error);
            });

    },
};