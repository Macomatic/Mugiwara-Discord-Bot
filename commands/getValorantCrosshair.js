const HenrikDevValorantAPI = require('unofficial-valorant-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalcrosshair')
        .setDescription('Gets the valorant crosshair from a crosshair code')
        .addStringOption(option => 
            option.setName('ch_code')
                .setDescription('Crosshair code')
                .setRequired(true)),
    async execute(interaction) {

        // Grabbing the crosshair code
        const chcode = interaction.options.getString('ch_code');

        // API call to get image of the crosshair
        const VAPI = new HenrikDevValorantAPI();
        const crosshair = await VAPI.getCrosshair({ code: chcode });

        // error handling
        const status = crosshair.status;
        if (status == 400 || status == 404) {
            return interaction.reply('Please provide a valid valorant crosshair code');
        }

        else if (status == 403 || status == 503) {
            return interaction.reply('Riot API Maintenance: Try again later');
        }

        else if (status == 408) {
            return interaction.reply('Timeout while fetching data');
        }

        // creating embed for crosshair display in chat
        const embed = new MessageEmbed()
            .setTitle('Valorant Crosshair')
            .addField('Code', `${chcode}`, false)
            .setColor('#47A4E4')
            .setImage(crosshair.url)
            .setFooter({
                text: '/getvalorantch command',
            });

            return interaction.reply({ embeds: [embed] });


    },
};