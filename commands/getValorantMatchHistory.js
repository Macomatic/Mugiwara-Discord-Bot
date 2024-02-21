const { VAPIKey } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalmatches')
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

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // Get params
        const username = interaction.options.getString('username');
        const tag = interaction.options.getString('tag');

        // Creating dict to hold map images for display in embed
        const mapPicsDict = {
            // range picture for new maps for error mitigation
            'Default': { Link: 'https://static.wikia.nocookie.net/valorant/images/3/37/Loading_Screen_Range.png/revision/latest/scale-to-width-down/1000?cb=20200607180003' }, 
            'Bind': { Link: 'https://static.wikia.nocookie.net/valorant/images/2/23/Loading_Screen_Bind.png/revision/latest/scale-to-width-down/1000?cb=20200620202316' },
            'Haven': { Link: 'https://static.wikia.nocookie.net/valorant/images/7/70/Loading_Screen_Haven.png/revision/latest/scale-to-width-down/1000?cb=20200620202335' },
            'Split': { Link: 'https://static.wikia.nocookie.net/valorant/images/d/d6/Loading_Screen_Split.png/revision/latest/scale-to-width-down/1000?cb=20230411161807' },
            'Ascent': { Link: 'https://static.wikia.nocookie.net/valorant/images/e/e7/Loading_Screen_Ascent.png/revision/latest/scale-to-width-down/1000?cb=20200607180020' },
            'Icebox': { Link: 'https://static.wikia.nocookie.net/valorant/images/1/13/Loading_Screen_Icebox.png/revision/latest/scale-to-width-down/1000?cb=20201015084446' },
            'Breeze': { Link: 'https://static.wikia.nocookie.net/valorant/images/1/10/Loading_Screen_Breeze.png/revision/latest/scale-to-width-down/1000?cb=20210427160616' },
            'Fracture': { Link: 'https://static.wikia.nocookie.net/valorant/images/f/fc/Loading_Screen_Fracture.png/revision/latest/scale-to-width-down/1000?cb=20210908143656' },
            'Pearl': { Link: 'https://static.wikia.nocookie.net/valorant/images/a/af/Loading_Screen_Pearl.png/revision/latest/scale-to-width-down/1000?cb=20220622132842' },
            'Lotus': { Link: 'https://static.wikia.nocookie.net/valorant/images/d/d0/Loading_Screen_Lotus.png/revision/latest/scale-to-width-down/1000?cb=20230106163526' },
            'Sunset': { Link: 'https://static.wikia.nocookie.net/valorant/images/5/5c/Loading_Screen_Sunset.png/revision/latest/scale-to-width-down/1000?cb=20230829125442' },
        };


        // API call to get basic account info
        const url = 'https://api.henrikdev.xyz/valorant/v1/mmr-history/na/' + username + '/' + tag;
        fetch(url, {
            headers: {
                'Authorization': VAPIKey,
            },
        })
        .then((response) => response.json())
        .then(rankedGames => {

            // error handling
            const status = rankedGames.status;
            if (status == 400 || status == 404) {
                interaction.editReply('Games do not exist on this account');
            }

            else if (status == 403 || status == 503) {
                interaction.editReply('Riot API Maintenance: Try again later');
            }

            else if (status == 408) {
                interaction.editReply('Timeout while fetching data');
            }
 

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
                    .setTitle(`${rankedGames.name} #${rankedGames.tag}: Game #${i + 1}`)
                    .setDescription(`${rg[i].date} BST`)
                    .addField('Map', `${rg[i].map.name}`, true)
                    .addField('Rank', `${rg[i].currenttierpatched}`, true)
                    .addField('MMR', `${rg[i].ranking_in_tier}`, true)
                    .addField('Gain/Loss', `${rg[i].mmr_change_to_last_game}`, true)
                    .setColor(embedColor)
                    .setThumbnail(arrow)
                    .setImage(mapPicsDict[rg[i].map.name].Link)
                    .setFooter({
                        text: '/getvalmatches command', 
                    });

                    embeds.push(gameEB);
            }
            interaction.editReply({ embeds: embeds });
    
        })
        .catch((error) => {
            interaction.editReply(error);
        });

    },
};