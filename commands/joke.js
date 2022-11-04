const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Gives a joke'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // api call
        const url = 'https://api.popcat.xyz/joke';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.editReply(json.joke);
            })
            .catch((error) => {
                interaction.editReply(error);
            });

    },
};