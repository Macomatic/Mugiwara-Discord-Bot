const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('movie')
        .setDescription('Gets movie information')
        .addStringOption(option => 
            option.setName('movie_name')
                .setDescription('Name of the movie to get info of')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        const movie = encodeURIComponent(interaction.options.getString('movie_name'));

        // api call
        const url = 'https://api.popcat.xyz/imdb?q=' + movie;
        fetch(url)
            .then(response => response.json())
            .then(json => {

                let rt = 'N/A';
                let meta = 'N/A';
                console.log(json.ratings[0].source);
                for (let i = 0; i < json.ratings.length; i++) {
                    if (json.ratings[i].source == 'Rotten Tomatoes') {
                        rt = json.ratings[i].value;
                    }
                    if (json.ratings[i].source == 'Metacritic') {
                        meta = json.ratings[i].value;
                    }
                }
                // embed for car in discord
                const embed = new MessageEmbed()
                    .setTitle(`${json.title}`)
                    .setDescription(`[IMDb](${json.imdburl})`)
                    .addField('Released', `${json.year}`, true)
                    .addField('Length', `${json.runtime}`, true)
                    .addField('Genres', `${json.genres}`, true)
                    .addField('IMBd', `${json.rating}/10`, true)
                    .addField('Rotten Tomatoes', `${rt}`, true)
                    .addField('Metacritic', `${meta}`, true)
                    .setImage(json.poster)
                    .setColor('#8EF3C2')
                    .setFooter({
                        text: '/movie command', 
                });

                interaction.editReply({ embeds: [embed] });
            })
            .catch((error) => {
                interaction.editReply(error);
            });

    },
};