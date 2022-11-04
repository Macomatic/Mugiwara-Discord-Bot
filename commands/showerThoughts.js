const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showerthoughts')
        .setDescription('Get a random shower thought'),
    async execute(interaction) {

        // api call
        const url = 'https://api.popcat.xyz/showerthoughts';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.reply(json.result);
            })
            .catch((error) => {
                interaction.reply(error);
            });

    },
};