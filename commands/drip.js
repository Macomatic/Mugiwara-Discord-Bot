const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drip')
        .setDescription('Ice on his wrist'),
    async execute(interaction) {

        const user = interaction.options.getUser('user') || interaction.user;
        const pfp = user.displayAvatarURL({ format: 'png' });

        // drip api call
        const url = 'https://api.popcat.xyz/drip?image=' + pfp;
        interaction.reply(url);


    },
};