const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js');
const { Client } = require('trace.moe');
const anilist = require('anilist-node');
const { MessageEmbed } = require('discord.js');


const Anilist = new anilist();
const traceClient = new Client();


module.exports = {
    data: new SlashCommandBuilder()
    .setName('animebypicture')
    .setDescription('Finds the anime based on an image')
    .addStringOption(option => 
        option.setName('url')
            .setDescription('Image Url')
            .setRequired(true)),
    async execute(interaction) {

        // using trace.moe API call to get information, saving it to a variable for future use
        const imageUrl = interaction.options.getString('url');
        const searchResults = await traceClient.getSimilarFromURL(imageUrl);        
        
        // I'm only giving results when the API has a confidence rating above 90%
        let similarity = parseFloat(searchResults.result[0].similarity);
        if (similarity < 0.88) {
            return interaction.reply('I could not determine which anime this comes from with absolute certainty. Please try another image!');
        }

        similarity = similarity * 100;
        similarity = similarity.toFixed(1);
        similarity = `${similarity}%`;


        const animeID = searchResults.result[0].anilist;
        let startTime = searchResults.result[0].from;
        let endTime = searchResults.result[0].to;
        const episode = searchResults.result[0].episode;

        // converting time values into a readable format of min:sec
        let min = 0;
        let sec = 0;
        
        min = parseFloat(startTime) / 60;
        sec = (60 * (min - Math.floor(min))).toFixed(0);
        min = Math.floor(min);

        if (sec < 10) {
            startTime = `${min}:0${sec}`;
        }
        else {
            startTime = `${min}:${sec}`;
        }

        min = parseFloat(endTime) / 60;
        sec = (60 * (min - Math.floor(min))).toFixed(0);
        min = Math.floor(min);

        if (sec < 10) {
            endTime = `${min}:0${sec}`;
        }
        else {
            endTime = `${min}:${sec}`;
        }

        // grabbing the anime's data using MAL API, then setting it to a discord embed alongside trace.moe API
        
        Anilist.media.anime(animeID).then(data => {
            const romajiTitle = data.title.romaji;
            const releaseDate = `${data.season}, ${data.seasonYear}`;
            const totalEpisodes = data.episodes;
            const embedColor = data.coverImage.color;
            const malID = data.idMal;
            const genres = data.genres;
            const embed = new MessageEmbed()
                .setTitle(romajiTitle)
                .setDescription(releaseDate)
                .setThumbnail(data.coverImage.large)
                .setColor(embedColor)
                .setTimestamp()
                .addField('Genres', `${genres}`)
                .addField('Episode', `${episode} of ${totalEpisodes}`)
                .addField('Timestamp', `${startTime} - ${endTime}`)
                .addField('Similarity', `${similarity}`)
                .addField('MAL Link', `https://myanimelist.net/anime/${malID}`)
                .setImage(imageUrl)
                .setFooter('/animebypicture command');
                

                return interaction.reply({ embeds: [embed] });
        });
    
    },
};