const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the 8ball a yes or no question')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('Your yes or no question')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();
        
        const question = interaction.options.getString('question');
        const params = encodeURIComponent(question);
        const uri = 'https://eightballapi.com/api/biased?question=' + params + '&lucky=false';
        const user = interaction.options.getUser('user') || interaction.user;
        const pfp = user.displayAvatarURL({ format: 'png' });

        fetch(uri)
            .then(response => response.json())
            .then(json => {

                const embed = new MessageEmbed()
                    .setTitle(`${user.username} asks: ${question}`)
                    .setDescription(`${json.reading}`)
                    .setColor('#805183')
                    .setThumbnail(pfp)
                    .setFooter({
                        text: '/8ball command', 
                });

                interaction.editReply({ embeds: [embed] });
            })
            .catch((error) => {
                interaction.editReply(error);
            });
    },
};