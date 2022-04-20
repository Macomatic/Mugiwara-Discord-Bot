const { SlashCommandBuilder } = require('@discordjs/builders');
const jikanjs = require('@mateoaranda/jikanjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getrandom')
        .setDescription('Finds random information on MAL based on given parameter')
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Options: anime, manga, characters, people')
                .setRequired(true)),
    async execute(interaction) {
        const type = interaction.options.getString('type');
        
        // if they choose to get random info about anime
        if (type === 'anime') {
            const { data } = await jikanjs.loadRandom(type);
            const malID = data.mal_id;
            const title = data.title; 
            const image = data.images.jpg.large_image_url; 

            // need to consider when a show hasnt aired; will have null episodes so i change that to 0
            let episodes = data.episodes;
            if (episodes == null) {
                episodes = '0';
            }

            const animeType = data.type; 

            // score can sometimes not be there; give it value of n/a in this case
            let score = data.score; 
            if (score == null) {
                score = 'N/A';
            }

            // rank can be null sometimes; accomodate for this
            let rank = data.rank;
            if (rank == null) {
                rank = 'N/A';
            }

            let genreString = '';
            const genres = data.genres;
            if (genres == null || genres == undefined) {
                console.log('no genres');
                genreString = 'N/A';
            }
            else {
                
                for (let i = 0; i < genres.length; i++) {
                    genreString = genreString + genres[i].name;
                    if (i + 1 != genres.length) {
                        genreString = genreString + ', ';
                    }
                }
            }
            if (genreString == '') {
                genreString = 'N/A';
            }

            const status = data.status; 
            const embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(`${animeType}, ${episodes} episodes`)
                .setThumbnail(image)
                .setColor('#E197C4')
                .addField('Status', `${status}`, true)
                .addField('Score', `${score}`, true)
                .addField('Rank', `${rank}`, true)
                .addField('Genres', `${genreString}`)
                .addField('MAL Link', `[Link](https://myanimelist.net/anime/${malID})`)
                .setFooter('/getrandom anime command');


                return interaction.reply({ embeds: [embed] });
        }
        // if they choose to get random info about manga
        else if (type === 'manga') {
            const { data } = await jikanjs.loadRandom(type);
            const malID = data.mal_id;
            const title = data.title; 
            const image = data.images.jpg.large_image_url;
            const mangaType = data.type;
            const status = data.status; 

            let volumes = data.volumes;
            let chapters = data.chapters;
            if (volumes == null) {
                volumes = 'Unknown';
            }
            if (chapters == null) {
                chapters = 'Unknown';
            }
            
            let authorsString = '';
            const authors = data.authors;
            if (authors == null || authors == undefined) {
                authorsString = 'N/A';
            }
            else {
                for (let i = 0; i < authors.length; i++) {
                    let authorName = authors[i].name;
                    authorName = authorName.split(', ');
                    authorName = authorName[1] + ' ' + authorName[0];
                    authorsString = authorsString + authorName;
                    if (i + 1 != authors.length) {
                        authorsString = authorsString + ', ';
                    }
                }
            }

            let genreString = '';
            const genres = data.genres;
            if (genres == null || genres == undefined) {
                genreString = 'N/A';
            }
            else {    
                for (let i = 0; i < genres.length; i++) {
                    genreString = genreString + genres[i].name;
                    if (i + 1 != genres.length) {
                        genreString = genreString + ', ';
                    }
                }
            }
            if (genreString == '') {
                genreString = 'N/A';
            }

            let rank = data.rank;
            if (rank == null) {
                rank = 'N/A';
            }

            let score = data.score; 
            if (score == null) {
                score = 'N/A';
            }

            const embed = new MessageEmbed()
                .setTitle(title)
                .setDescription(`${mangaType}, ${volumes} volumes, ${chapters} chapters`)
                .setColor('#5FC1DB')
                .setThumbnail(image)
                .addField('Status', `${status}`, true)
                .addField('Score', `${score}`, true)
                .addField('Rank', `${rank}`, true)
                .addField('Genres', `${genreString}`)
                .addField('MAL Link', `[Link](https://myanimelist.net/manga/${malID})`)
                .setFooter('/findrandommal manga command');
  
            return interaction.reply({ embeds: [embed] });

        }
        // if they choose to get random info about manga/anime characters 
        else if (type === 'characters') {
            const { data } = await jikanjs.loadRandom(type);
            const name = data.name;
            const malLink = data.url;
            const image = data.images.jpg.image_url;

            const embed = new MessageEmbed()
                .setTitle(name)
                .setImage(image)
                .addField('MAL Link', `[Link](${malLink})`, true)
                .setFooter('/findrandommal characters command');

                return interaction.reply({ embeds: [embed] });

        }
        // if they choose to get random info about anime/manga people
        else if (type === 'people') {
            const { data } = await jikanjs.loadRandom(type);
            const name = data.name;
            const malLink = data.url;
            const image = data.images.jpg.image_url;

            const embed = new MessageEmbed()
                .setTitle(name)
                .setImage(image)
                .addField('MAL Link', `[Link](${malLink})`, true)
                .setFooter('/findrandommal people command');

                return interaction.reply({ embeds: [embed] });
        }
        else {
            return interaction.reply('Give a valid option');
        }

    },
};