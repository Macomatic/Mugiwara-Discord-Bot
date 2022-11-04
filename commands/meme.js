const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Generates a random meme'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // api call
        const url = 'https://api.popcat.xyz/meme';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.editReply(json.image);
            })
            .catch((error) => {
                interaction.editReply(error);
            });

    },
};