const { VAPIKey } = require('../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalsession')
        .setDescription('Gets data about your last valorant play session')
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

        // arrays to get numerical values for string dates
        const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; 
        const days = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // API call to get basic account info
        const url = 'https://api.henrikdev.xyz/valorant/v1/mmr-history/na/' + username + '/' + tag;
        fetch(url, {
            headers: {
                'Authorization': VAPIKey,
            },
        })
        .then((response) => response.json())
        .then(session => { 

            // error handling
            const status = session.status;
            if (status == 400 || status == 404) {
                interaction.editReply('This account does not exist or is private');
            }

            else if (status == 403 || status == 503) {
                interaction.editReply('Riot API Maintenance: Try again later');
            }

            else if (status == 408) {
                interaction.editReply('Timeout while fetching data');
            }

            else if (status == 429) {
                interaction.editReply('API Limit: Try again later');
            }

            const gameDate = []; 
            let concurrentGames = 0;
            let updated = false;
            let approxMinutes = 26;
            let netMMR = 0;
            for (let i = 0; i < session.data.length; i++) {
            
                // first we are gonna count how many games we believe are concurrent/within the same session
                

                // get date
                let date = session.data[i].date;

                // holds date as [year,month,day,number,hour,min] --> tried using date object and had weird functionality
                

                // day: Sunday, Monday, ..etc
                const day = days.indexOf(date.substring(0, date.indexOf(', ')));
                date = date.substring(date.indexOf(' ') + 1);

                // Month and day number
                const monthDay = date.substring(0, date.indexOf(', ')).split(' ');
                const month = months.indexOf(monthDay[0]);
                const number = parseInt(monthDay[1]);
                date = date.substring(date.indexOf(', ') + 2);

                // Year and time
                const yearTime = date.split(' ');
                const year = parseInt(yearTime[0]);
                const time = yearTime[1];

                // Time as hour and min
                const hourMin = time.split(':');
                let hour = parseInt(hourMin[0]);
                const min = parseInt(hourMin[1]);
                const APM = yearTime[2];

                if (APM == 'PM') {
                    hour += 12;
                }

                // first game in the session, we need to add to array
                if (concurrentGames == 0) {
                    // add to array
                    gameDate.push(year);
                    gameDate.push(month);
                    gameDate.push(day);
                    gameDate.push(number);
                    gameDate.push(hour);
                    gameDate.push(min);
                    concurrentGames += 1;
                    netMMR += session.data[i].mmr_change_to_last_game;
                }

                // checking if game is concurrent
                else {
                    updated = false;
                    // case 1: same day same hour diff minutes => multiple games in the same hour, automatically considered concurrent
                    if (gameDate[2] == day && gameDate[3] == number && gameDate[4] == hour) {
                        concurrentGames++;
                        updated = true;
                        approxMinutes += (gameDate[5] - min);
                        netMMR += session.data[i].mmr_change_to_last_game;
                    }

                    // // case 2: same day diff hour diff minutes => games on the same day but could be hours apart, need to check time diff
                    else if (gameDate[2] == day && gameDate[3] == number && (gameDate[5] - min < 0 || (((gameDate[4] * 60) - (hour * 60)) + (gameDate[5] - min) <= 63))) {
                        concurrentGames++;
                        updated = true;

                        // diff hours but not because the game was an hour long
                        if (gameDate[5] - min < 0) {
                            approxMinutes += 60 - min + gameDate[5];
                        }
                        else {
                            approxMinutes += ((gameDate[4] * 60) - (hour * 60)) + (gameDate[5] - min);
                        }
                        netMMR += session.data[i].mmr_change_to_last_game;
                        
                    }

                    // // case 3: diff day diff hour diff minutes => games on diff days, could be concurrent if games goes thru midnight, need to check if time is at the midnight point when days are different
                    else if (gameDate[2] != day && gameDate[3] != number && (gameDate[4] == 0 && hour == 23 && gameDate[5] < 40 && min >= 25)) {
                        concurrentGames++;
                        updated = true;
                        approxMinutes += 60 - min + gameDate[5];
                        netMMR += session.data[i].mmr_change_to_last_game;
                    }   

                    // // not concurrent
                    else {
                        if (concurrentGames == 1) {
                            interaction.editReply('You only played one concurrent game! Use /getvalmatches to view your games');
                        }
                        else {
                            break;
                        }
                    }

                    // update gameDate to check next game
                    if (updated) {
                        gameDate[0] = year;
                        gameDate[1] = month;
                        gameDate[2] = day;
                        gameDate[3] = number;
                        gameDate[4] = hour;
                        gameDate[5] = min;
                    }

                }


            }

            // Checking for promotion/demotion

            // NEED TO CHECK EDGE CASE WHERE BEFORE CURRENT SESSION START, THEY WERE AT 0 RR
                // If first game is a loss, they demote however since session dictates that their first game was in demoted rank, it would say no change
                // New check added to check game prior to session for rank change as well

            if (concurrentGames > 1) {
                // format the embed
                let embedColor;
                let rankChange = 'No progress';
                if (netMMR > 0) {
                    embedColor = '#30EF53';
                    if (session.data[0].currenttierpatched != session.data[concurrentGames - 1].currenttierpatched || session.data[0].currenttierpatched != session.data[concurrentGames].currenttierpatched) {
                        rankChange = 'Promotion';
                    }
                }
                else {
                    embedColor = '#FC2D10';
                    if (session.data[0].currenttierpatched != session.data[concurrentGames - 1].currenttierpatched || session.data[0].currenttierpatched != session.data[concurrentGames].currenttierpatched) {
                        rankChange = 'Demotion';
                    }
                }


                let customGifURL;
                let keepPlaying;
                
                // Close to rankup
                if (session.data[0].elo % 100 > 83 && rankChange == 'No progress') {
                    keepPlaying = 'Don\'t choke the rankup';
                    customGifURL = 'https://media1.tenor.com/m/PiFqVBIspFYAAAAC/anime-choke.gif';
                }

                // Close to demotion
                else if (session.data[0].elo % 100 < 15 && rankChange == 'No progress') {
                    keepPlaying = 'You\'re in dangerous territory';
                    customGifURL = 'https://media.tenor.com/tGsGznZYDu8AAAAd/sage-valorant-sage.gif';
                }

                // Demotion game
                else if (session.data[0].elo % 100 == 0) {
                    keepPlaying = '(ㆆ _ ㆆ)';
                    customGifURL = 'https://media1.tenor.com/m/sOYJlfNaeQcAAAAd/kirby-roblox.gif';
                }
                
                // Negative MMR
                else if (netMMR < 0 && netMMR > -22) {
                    keepPlaying = 'Can\'t end while negative';
                    customGifURL = 'https://media1.tenor.com/m/cJRcMyUAiMcAAAAd/ah-shit-here-we-go-again-ah-shit.gif';
                }
                else if (netMMR <= -22 && netMMR > -50) {
                    keepPlaying = 'Take a break';
                    customGifURL = 'https://media.tenor.com/CW-0A0q-6ksAAAAd/touching-grass.gif';
                }
                else if (netMMR <= -50 && netMMR > -80) {
                    keepPlaying = 'Down horrendous';
                    customGifURL = 'https://media.tenor.com/zkIhdydgeAYAAAAd/ousama-ranking-bojji.gif';
                }
                else if (netMMR <= -80) {
                    keepPlaying = 'Uninstall';
                    customGifURL = 'https://media1.tenor.com/m/rYCdWzuqXIIAAAAC/petty-parker-smoke.gif';
                }

                // Neutral/Positive MMR
                else if (netMMR == 0) {
                    keepPlaying = `Imagine playing ${concurrentGames} games and making no progress lmao`;
                    customGifURL = 'https://media1.tenor.com/m/CRsWMpXOLpYAAAAC/laughing-straight-laughing-to-straight-face-emoji.gif';
                }
                else if (netMMR > 0 && netMMR <= 20) {
                    keepPlaying = 'A win is a win';
                    customGifURL = 'https://media.tenor.com/YV2WPrnq7NwAAAAC/jett-valorant.gif'; 
                }
                else if (netMMR > 20 && netMMR < 50) {
                    keepPlaying = 'You\'re up';
                    customGifURL = 'https://media1.tenor.com/m/kkKH_A8zaG8AAAAC/buttsmarnn.gif';
                }
                else if (netMMR >= 50 && netMMR < 80) {
                    keepPlaying = 'Up good';
                    customGifURL = 'https://media1.tenor.com/m/L-I_GamUq3sAAAAC/gear-5-luffy-gear-5.gif';
                }
                else {
                    keepPlaying = 'Gigachad';
                    customGifURL = 'https://media.tenor.com/ooszlfS5lo4AAAAd/goku-ultra-instinct.gif';
                }

                const hourFormat = Math.floor(approxMinutes / 60);
                const minFormat = approxMinutes - (hourFormat * 60);
                const playtime = `${hourFormat} hours, ${minFormat} minutes`;


                const embed = new MessageEmbed()
                    .setTitle(`${session.name} #${session.tag}`)
                    .setDescription(`Recent Game Session: ${concurrentGames} games`)
                    .addField('Rank', `${session.data[0].currenttierpatched}`, true)
                    .addField('Net MMR', `${netMMR}`, true)
                    .addField('Rank Change', `${rankChange}`, true)
                    .addField('Approx. playtime', `${playtime}`, true)
                    .addField('Status', `${keepPlaying}`, true)
                    .setColor(embedColor)
                    .setThumbnail(session.data[0].images.small)
                    .setImage(customGifURL)
                    .setFooter({
                        text: '/getvalsession command', 
                    });

                    interaction.editReply({ embeds: [embed] });
            }

        })
        .catch((error) => {
            interaction.editReply(error);
        });
    },
};