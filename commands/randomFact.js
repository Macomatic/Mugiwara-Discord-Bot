const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomfact')
        .setDescription('Gives a random fact'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // api call
        const url = 'https://api.popcat.xyz/fact';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.editReply(json.fact);
            })
            .catch((error) => {
                interaction.editReply(error);
            });

    },
};