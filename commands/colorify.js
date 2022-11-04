const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colorify')
        .setDescription('Colors the pfp of the user'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const user = interaction.options.getUser('user') || interaction.user;
        const pfp = user.displayAvatarURL({ format: 'png' });

        // first api call to get a random color
        const colorURL = 'https://api.popcat.xyz/randomcolor';
        fetch(colorURL)
            .then(response => response.json())
            .then(colorJSON => {
                const color = colorJSON.hex;
                
                // second api call to use color to change pfp
                const colorifyURL = 'https://api.popcat.xyz/colorify?image=' + pfp + '&color=' + color;
                interaction.editReply(colorifyURL);
            })
            .catch((error) => {
                interaction.editReply(error);
            });

    },
};