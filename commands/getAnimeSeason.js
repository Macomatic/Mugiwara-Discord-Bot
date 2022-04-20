const jikanjs = require('@mateoaranda/jikanjs');
// const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getanimeseason')
        .setDescription('Gets the top 10 anime of the season based on the given parameter')
        .addStringOption(option => 
            option.setName('option')
                .setDescription('Options: current, upcoming')
                .setRequired(true)),
    async execute(interaction) {
        const option = interaction.options.getString('option');
        let data = null;
        let title = ' ';
        if (option === 'current') {
            data = await jikanjs.loadCurrentSeason(1);
            title = 'Top 10 Anime for the Current Season';
        }
        else if (option === 'upcoming') {
            data = await jikanjs.loadUpcomingSeason(1);
            title = 'Top 10 Anime for the Upcoming Season';
        }
        else {
            return interaction.reply('Give a valid option');
        }

        // Creating arrays to store anime information
        const animeNames = [];
        const animeScore = [];
        const animeType = [];
        const animeEpisodes = []; 

        // loop runs through the page of animes
        for (let i = 0; i < data.data.length; i++) {
            animeNames[i] = data.data[i].title;
            animeType[i] = data.data[i].type;
            if (data.data[i].score == null) {
                animeScore[i] = 'Unknown';
            }
            else {
                animeScore[i] = data.data[i].score;
            }
            
            if (data.data[i].episodes == null) {
                animeEpisodes[i] = 'Unknown';
            }
            else {
                animeEpisodes[i] = data.data[i].episodes;
            }
            
        }

        // reducing the 25 unordered animes to top 10 based on score
        let currMax = 0.0;
        let current = 0.0;
        let index = 0;
        let tempName, tempScore, tempType, tempEpisode = ' ';
        for (let j = 0; j < 10; j++) {
            currMax = animeScore[j];
            index = j;
            for (let k = j + 1; k < animeNames.length; k++) {
                current = animeScore[k];
                if (current > currMax) {
                    index = k;
                    currMax = current;
                }
            }
            // sorting
            if (index != j) {
                // First, saving outer array values in temp variables
                tempEpisode = animeEpisodes[j];
                tempScore = animeScore[j];
                tempType = animeType[j];
                tempName = animeNames[j];

                // Second, overriding outer array values with new max
                animeEpisodes[j] = animeEpisodes[index];
                animeScore[j] = animeScore[index];
                animeType[j] = animeType[index];
                animeNames[j] = animeNames[index];

                // Finally, override old max position with temp variables
                animeEpisodes[index] = tempEpisode;
                animeScore[index] = tempScore;
                animeType[index] = tempType;
                animeNames[index] = tempName;
            }
        }


        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor('#BC3CBA')
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png')
            .addField(`#1: ${animeNames[0]}`, `Type: ${animeType[0]}, Episodes: ${animeEpisodes[0]}, Score: ${animeScore[0]}`)
                .addField(`#2: ${animeNames[1]}`, `Type: ${animeType[1]}, Episodes: ${animeEpisodes[1]}, Score: ${animeScore[1]}`)
                .addField(`#3: ${animeNames[2]}`, `Type: ${animeType[2]}, Episodes: ${animeEpisodes[2]}, Score: ${animeScore[2]}`)
                .addField(`#4: ${animeNames[3]}`, `Type: ${animeType[3]}, Episodes: ${animeEpisodes[3]}, Score: ${animeScore[3]}`)
                .addField(`#5: ${animeNames[4]}`, `Type: ${animeType[4]}, Episodes: ${animeEpisodes[4]}, Score: ${animeScore[4]}`)
                .addField(`#6: ${animeNames[5]}`, `Type: ${animeType[5]}, Episodes: ${animeEpisodes[5]}, Score: ${animeScore[5]}`)
                .addField(`#7: ${animeNames[6]}`, `Type: ${animeType[6]}, Episodes: ${animeEpisodes[6]}, Score: ${animeScore[6]}`)
                .addField(`#8: ${animeNames[7]}`, `Type: ${animeType[7]}, Episodes: ${animeEpisodes[7]}, Score: ${animeScore[7]}`)
                .addField(`#9: ${animeNames[8]}`, `Type: ${animeType[8]}, Episodes: ${animeEpisodes[8]}, Score: ${animeScore[8]}`)
                .addField(`#10: ${animeNames[9]}`, `Type: ${animeType[9]}, Episodes: ${animeEpisodes[9]}, Score: ${animeScore[9]}`)
                .setFooter('/gettop anime command');

                return interaction.reply({ embeds: [embed] });
    },
};
