const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pickupline')
        .setDescription('Gives a pickup line')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The @ of the discord person')
                .setRequired(true)),
    async execute(interaction) {

        const person = interaction.options.getUser('user');
        const discordMention = '<@' + person.id + '>';

        // api call
        const url = 'https://api.popcat.xyz/pickuplines';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                interaction.reply(discordMention + ', ' + json.pickupline);
            })
            .catch((error) => {
                interaction.reply(error);
            });

    },
};