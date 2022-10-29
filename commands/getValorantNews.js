const HenrikDevValorantAPI = require('unofficial-valorant-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalnews')
        .setDescription('Gets the most recent Valorant news dependent on the given type')
        .addStringOption(option => 
            option.setName('category')
                .setDescription('Options: patch_notes, esports, game_updates, dev, community, announcements')
                .setRequired(true)),
    async execute(interaction) {

        // Get params
        const type = interaction.options.getString('category');


        // API call to get basic account info
        const VAPI = new HenrikDevValorantAPI();
        const newsPayload = await VAPI.getWebsite({ country_code: 'en-us' });   

        // error handling
        const status = newsPayload.status;
        if (status == 400 || status == 404) {
            return interaction.reply('This account does not exist or is private');
        }

        else if (status == 403 || status == 503) {
            return interaction.reply('Riot API Maintenance: Try again later');
        }

        else if (status == 408) {
            return interaction.reply('Timeout while fetching data');
        }

        else if (type != 'patch_notes' && type != 'esports' && type != 'game_updates' && type != 'dev' && type != 'community' && type != 'announcements') {
            return interaction.reply('Please provide a valid, CASE-SENSITIVE option');
        }

        // Parse through all the news to find the 3 most recent of the provided type of news
        const news = newsPayload.data;
        const relevantNews = [];
        let newsType;

        for (let i = 0; i < news.length; i++) {
            newsType = news[i].category;
            if (newsType == type) {
                relevantNews.push(news[i]);
            }

            if (relevantNews.length >= 3) {
                break;
            }
        }

        
        // Reformating category
        let category;
        if (type == 'patch_notes') {
            category = 'Patch Notes';
        }
        else if (type == 'game_updates') {
            category = 'Game Updates';
        }
        else {
            category = type.charAt(0).toUpperCase() + type.slice(1);
        }
        
        // Parsing through relevant news to create embed array for discord output
        const newsEB = [];
        let date;
        for (let i = 0; i < relevantNews.length; i++) {
            
            date = relevantNews[i].date.substring(0,10);

            // embed
            const embed = new MessageEmbed()
                .setTitle(`${relevantNews[i].title}`)
                .setDescription(`[URL](${relevantNews[i].url})`)
                .addField('Category', `${category}`, true)
                .addField('Date', `${date}`, true)
                .setColor('#A0CF5D')
                .setImage(relevantNews[i].banner_url)
                .setFooter({
                    text: '/getvalnews command', 
                });

                newsEB.push(embed);
        }
        

        return interaction.reply({ embeds: newsEB });

    },
};