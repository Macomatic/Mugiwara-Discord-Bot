const HenrikDevValorantAPI = require('unofficial-valorant-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomvalcrosshair')
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

        // c;[1,7] --> Determines color; no c;? param means white, 1: Green, 2: Yellow Green, 3: Green Yellow, 4: Yellow, 5: Cyan, 6: Pink, 7: Red
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

        // Inner Lines Massive Chunk
        // 0b;0 if inner lines off, otherwise alot of other options if on
        rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            chcode += '0b;0;';
        }
        else {
            // 0t;[0,10] inner line thickness 
            rand = Math.floor(Math.random() * 11);
            chcode += `0t;${rand};`;

            // 0l;[0,20] inner line length
            rand = Math.floor(Math.random() * 21);
            chcode += `0l;${rand};`;

            // 0o;[0,20] inner line offset
            rand = Math.floor(Math.random() * 21);
            chcode += `0o;${rand};`;

            // 0a;[0.000,1.000] inner line opacity
            rand = (Math.random() * (0.000 - 1.000) + 1.000).toFixed(3);
            chcode += `0a;${rand};`;

            // need to check firing error here because its placement depends on if its on or not
            let firingError = 0;
            firingError = Math.floor(Math.random() * 2);


            // 0m;1 for movement error on, otherwise nothing for no
            rand = Math.floor(Math.random() * 2);
            if (rand == 1) {
                chcode += '0m;1;';
                
                // one case where firing error is not on
                if (firingError == 0) {
                    chcode += '0f;0;';
                }


                // 0s;[0.000,3.000] for movement error multiplier
                rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                chcode += `0s;${rand};`;

                // one case where firing error is on, then we include the FE multi here; 0e;[0.000,3.000];
                if (firingError == 1) {
                    rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                    chcode += `0e;${rand};`;
                }
            }

            else if (rand == 0) {
                if (firingError == 0) {
                    chcode += '0f;0;';
                }
                else {
                    rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                    chcode += `0e;${rand};`;
                }
            }
        }

        // Outer Lines Massive Chunk
        // 1b;0 if outer lines off, otherwise alot of other options if on
        rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            chcode += '1b;0;';
        }
        else {
            // 1t;[0,10] outer line thickness 
            rand = Math.floor(Math.random() * 11);
            chcode += `1t;${rand};`;

            // 1l;[0,10] outer line length
            rand = Math.floor(Math.random() * 11);
            chcode += `1l;${rand};`;

            // 1o;[0,40] outer line offset
            rand = Math.floor(Math.random() * 41);
            chcode += `1o;${rand};`;

            // 1a;[0.000,1.000] outer line opacity
            rand = (Math.random() * (0.000 - 1.000) + 1.000).toFixed(3);
            chcode += `1a;${rand};`;

            let movementError = 0;
            let firingError = 0;
            movementError = Math.floor(Math.random() * 2);
            firingError = Math.floor(Math.random() * 2);

            if (movementError == 0) {
                chcode += '1m;0;';
                if (firingError == 0) {
                    chcode += '1f;0;';
                }
                else {
                    rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                    chcode += `1e;${rand};`;
                }
            }
            else if (movementError == 1) {
                if (firingError == 0) {
                    chcode += '1f;0;';
                    rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                    chcode += `1s;${rand};`;
                }
                else {
                    rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                    chcode += `1s;${rand};`;
                    rand = (Math.random() * (0.000 - 3.000) + 3.000).toFixed(3);
                    chcode += `1e;${rand};`;
                }
            }
        }

        // Ensuring removal of extra ; at the end of the ch code
        if (chcode.lastIndexOf(';') + 1 == chcode.length) {
            chcode = chcode.substring(0, chcode.length - 1);
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
            .setTitle('Random Valorant Crosshair')
            .addField('Code', `${chcode}`, false)
            .setColor('#DA2BB2')
            .setImage(crosshair.url)
            .setFooter({
                text: '/randomvalcrosshair command',
            });

            return interaction.reply({ embeds: [embed] });


    },
};