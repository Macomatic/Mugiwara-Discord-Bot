const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Gives a joke'),
    async execute(interaction) {

        // api call
        const url = 'https://api.popcat.xyz/joke';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.reply(json.joke);
            })
            .catch((error) => {
                interaction.reply(error);
            });

    },
};