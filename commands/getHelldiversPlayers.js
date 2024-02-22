const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { STEAMAPIKEY } = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('helldiverspc')
        .setDescription('Gets the HellDivers 2 player count'),
    async execute(interaction) {
    
        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // API Call
        
        const url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key=' + STEAMAPIKEY + '&appid=' + '553850';
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            const playerCount = (data.response.player_count).toString();

            // embed
            const embed = new MessageEmbed()
            .setTitle('Current HellDivers 2 Player Count')
            .setDescription(`${playerCount}`)
            .setColor('YELLOW')
            .setThumbnail('https://image.api.playstation.com/vulcan/ap/rnd/202309/0718/ca77865b4bc8a1ea110fbe1492f7de8f80234dd079fc181a.png')
            .setTimestamp()
            .setFooter({
                text: '/helldiverspc command', 
            });

            interaction.editReply({ embeds: [embed] });
            
        })
        .catch((error) => {
            interaction.editReply(error);
        });
    },
};