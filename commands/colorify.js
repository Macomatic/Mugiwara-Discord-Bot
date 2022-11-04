const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('colorify')
        .setDescription('Colors the pfp of the user'),
    async execute(interaction) {

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
                interaction.reply(colorifyURL);
            })
            .catch((error) => {
                interaction.reply(error);
            });

    },
};