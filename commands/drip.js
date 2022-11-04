const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drip')
        .setDescription('Ice on his wrist'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;
        const pfp = user.displayAvatarURL({ format: 'png' });

        // drip api call
        const url = 'https://api.popcat.xyz/drip?image=' + pfp;
        interaction.editReply(url);


    },
};