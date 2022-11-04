const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomfact')
        .setDescription('Gives a random fact'),
    async execute(interaction) {

        // api call
        const url = 'https://api.popcat.xyz/fact';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.reply(json.fact);
            })
            .catch((error) => {
                interaction.reply(error);
            });

    },
};