const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { VAPIKey } = require('../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalaccount')
        .setDescription('Gets the Valorant account given the username and tag')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('Username of the account')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('tag')
                .setDescription('Tag of the account')
                .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        // Get params
        const username = interaction.options.getString('username');
        const tag = interaction.options.getString('tag');


        // API call to get basic account info
        const accountURL = 'https://api.henrikdev.xyz/valorant/v1/account/' + username + '/' + tag;
        fetch(accountURL, {
            headers: {
                'Authorization': VAPIKey,
            },
        })
        .then((response) => response.json())
        .then(account => {   

            // error handling
            const status = account.status;
            if (status == 400 || status == 404) {
                return interaction.reply('This account does not exist or is private');
            }

            else if (status == 403 || status == 503) {
                return interaction.reply('Riot API Maintenance: Try again later');
            }

            else if (status == 408) {
                return interaction.reply('Timeout while fetching data');
            }

            else if (status == 429) {
                return interaction.reply('API Limit: Try again later');
            }


            // API call for MMR; happens after error check to ensure account exists
            const mmrURL = 'https://api.henrikdev.xyz/valorant/v1/mmr/na/' + username + '/' + tag;
            fetch(mmrURL, {
                headers: {
                    'Authorization': VAPIKey,
                },
            })
            .then((response) => response.json())
            .then(mmr => { 

                // Custom embed color based on rank
                let embedColor = '#ffffff';
                const rank = mmr.data.currenttierpatched;
                if (rank.includes('Iron')) {
                    embedColor = '#505257';
                }
                else if (rank.includes('Bronze')) {
                    embedColor = '#4f2e1a';
                }
                else if (rank.includes('Silver')) {
                    embedColor = '#c2c2c2';
                }
                else if (rank.includes('Gold')) {
                    embedColor = '#d1ab24';
                }
                else if (rank.includes('Platinum')) {
                    embedColor = '#3e839e';
                }
                else if (rank.includes('Diamond')) {
                    embedColor = '#d299de';
                }
                else if (rank.includes('Ascendant')) {
                    embedColor = '#65ad7a';
                }
                else if (rank.includes('Immortal')) {
                    embedColor = '#bf3643';
                }
                else if (rank.includes('Radiant')) {
                    embedColor = '#ffedad';
                }

                // Tracker.gg URL 
                const url = `https://tracker.gg/valorant/profile/riot/${account.data.name}%23${account.data.tag}/overview`;

                // embed
                const embed = new MessageEmbed()
                    .setTitle(`${account.data.name} #${account.data.tag}`)
                    .setDescription(`[Tracker.gg](${url})`)
                    .addField('Lvl', `${account.data.account_level}`, true)
                    .addField('Rank', `${rank}`, true)
                    .addField('Elo', `${mmr.data.elo}`, true)
                    .setColor(embedColor)
                    .setThumbnail(mmr.data.images.small)
                    .setImage(account.data.card.wide)
                    .setTimestamp()
                    .setFooter({
                        text: '/getValAccount command', 
                    });

                interaction.editReply({ embeds: [embed] });
            })
            .catch((error) => {
                interaction.editReply(error);
            });
        })
        .catch((error) => {
            interaction.editReply(error);
        });
    
    },
};