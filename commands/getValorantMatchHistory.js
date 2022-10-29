const HenrikDevValorantAPI = require('unofficial-valorant-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalr')
        .setDescription('Gets the Valorant accounts last 5 matches')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('Username of the account')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('tag')
                .setDescription('Tag of the account')
                .setRequired(true)),
    async execute(interaction) {

        // Get params
        const username = interaction.options.getString('username');
        const tag = interaction.options.getString('tag');


        // API call to get basic account info
        const VAPI = new HenrikDevValorantAPI();
        const rankedGames = await VAPI.getMMRHistory({ region: 'na', name: username, tag: tag }); 

        // error handling
        const status = rankedGames.status;
        if (status == 400 || status == 404) {
            return interaction.reply('Games do not exist on this account');
        }

        else if (status == 403 || status == 503) {
            return interaction.reply('Riot API Maintenance: Try again later');
        }

        else if (status == 408) {
            return interaction.reply('Timeout while fetching data');
        }

        const account = await VAPI.getAccount({ name: username, tag: tag });   


        // adjusting loop to run for max of 5 recent games
        let numOfGames;
        if (rankedGames.data.length >= 5) {
            numOfGames = 5;
        }
        else {
            numOfGames = rankedGames.data.length;
        }

        // embed formatting
        const rg = rankedGames.data;
        const embeds = [];
        let embedColor;
        let arrow;
        for (let i = 0; i < numOfGames; i++) {

            if (rg[i].mmr_change_to_last_game > 0) {
                embedColor = '#30EF53';
                arrow = rg[i].images.triangle_up;
            }
            else {
                embedColor = '#FC2D10';
                arrow = rg[i].images.triangle_down;
            }

            // embed
            const gameEB = new MessageEmbed()
                .setTitle(`${account.data.name} #${account.data.tag}: Game #${i + 1}`)
                .setDescription(`${rg[i].date} BST`)
                .addField('Rank', `${rg[i].currenttierpatched}`, true)
                .addField('MMR', `${rg[i].ranking_in_tier}`, true)
                .addField('Gain/Loss', `${rg[i].mmr_change_to_last_game}`, true)
                .setColor(embedColor)
                .setThumbnail(arrow)
                // .setImage(account.data.card.wide)
                .setFooter({
                    text: '/getvalr command', 
                });

                embeds.push(gameEB);
        }

        
        return await interaction.reply({ embeds: embeds });


    },
};