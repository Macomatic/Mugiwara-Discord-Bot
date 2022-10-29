const HenrikDevValorantAPI = require('unofficial-valorant-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randvalcrosshair')
        .setDescription('Generates a random valorant crosshair'),
    async execute(interaction) {

        // ===============  RANDOMIZING CROSSHAIR BEGINNING ===============
        let chcode = '';
        let rand = 0;

        // 0;P or 0;s;1;P --> Genuinely no clue what this option means, only that they are mutually exclusive
        rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            chcode += '0;P;';
        }
        else {
            chcode += '0;s;1;P;';
        }

        // c;[1,7] --> Determines color; no c;? param means white
        rand = Math.floor(Math.random() * 8);
        if (rand != 0) {
            chcode += `c;${rand};`;
        }

        // h;0 for outlines off, no h for outlines on
        rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            chcode += 'h;0;';
        }
        // when outlines are on, t;[1,6] for outline thickness and o;[0.000,1.000] for outline opacity
        else { 
            rand = Math.floor(Math.random() * 6) + 1;
            chcode += `t;${rand};`;
            rand = (Math.random() * (0.000 - 1.000) + 1.000).toFixed(3);
            chcode += `o;${rand};`;
        }

        // d;1 for center dot, nothing for no center dot. when center dot is on, z;[1,6] for center dot thickness, a;[0.000,1.000) for center dot opacity. if a is 1.000, then a;1.000 IS NOT INCLUDED
        rand = Math.floor(Math.random() * 2);
        if (rand == 1) {
            chcode += 'd;1;';
            rand = Math.floor(Math.random() * 6) + 1;
            chcode += `z;${rand};`;
            rand = (Math.random() * (0.000 - 1.000) + 1.000).toFixed(3);
            if (rand != 1.000) {
                chcode += `a;${rand};`;
            }
        }
        
        // f;0 for NO fade crosshair with firing error, nothing if on
        rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            chcode += 'f;0;';
        }

        // s;0 for NO show spectated player's crosshair, nothing if on
        rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            chcode += 's;0;';
        }

        // m;1 for override firing error offset with crosshair offset, nothing if off
        rand = Math.floor(Math.random() * 2);
        if (rand == 1) {
            chcode += 'm;1;';
        }



        // ==================  RANDOMIZING CROSSHAIR END ==================

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