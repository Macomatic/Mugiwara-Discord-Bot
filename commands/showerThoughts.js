const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showerthoughts')
        .setDescription('Get a random shower thought'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // api call
        const url = 'https://api.popcat.xyz/showerthoughts';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.editReply(json.result);
            })
            .catch((error) => {
                interaction.editReply('Error: ' + error);
            });

    },
};