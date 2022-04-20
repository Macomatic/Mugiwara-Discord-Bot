const { SlashCommandBuilder } = require('@discordjs/builders');
const jikanjs = require('@mateoaranda/jikanjs');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gettop')
        .setDescription('Gets the top 25 of the given parameter on MAL')
        .addStringOption(option => 
            option.setName('type')
                .setDescription('Options: anime, manga')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('subtype')
                .setDescription('Anime: tv, movie, ova, special, ona. Manga: manga, novel, lightnovel, manhwa, manhua')
                .setRequired(false)),
    async execute(interaction) {
        const type = interaction.options.getString('type');
        const subtype = interaction.options.getString('subtype');
        let data = null;
        if (type === 'anime') {
            if (subtype == null) {
                data = await jikanjs.loadTop(type, 1);
            }
            else if (subtype === 'tv' || subtype === 'movie' || subtype === 'ova' || subtype === 'special' || subtype === 'ona') {
                data = await jikanjs.loadTop(type, 1, subtype);
                
            }
            else {
                return interaction.reply('Give a valid subtype option');
            }

            // Creating arrays to store each anime's crucial information to make an embed; rank is index + 1
            const animeNames = []; 
            const animeType = [];
            const animeScore = [];
            const animeEpisodes = [];

            // loop runs for number of elements in data object; should be 25
            for (let i = 0; i < data.data.length; i++) {
                animeNames[i] = data.data[i].title;
                animeType[i] = data.data[i].type;
                animeScore[i] = data.data[i].score;
                animeEpisodes[i] = data.data[i].episodes;
            }

            let title = ' ';
            if (subtype == null) {
                title = 'Top 25 Anime';
            }
            else {
                const subtypeTitle = subtype[0].toUpperCase() + subtype.slice(1);
                title = `Top 25 ${subtypeTitle} Anime`;
            }
            const embed = new MessageEmbed()
                .setTitle(title)
                .setColor('#F4CA2C')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png')
                .addField(`#1: ${animeNames[0]}`, `Type: ${animeType[0]}, Episodes: ${animeEpisodes[0]}, Score: ${animeScore[0]}`)
                .addField(`#2: ${animeNames[1]}`, `Type: ${animeType[1]}, Episodes: ${animeEpisodes[1]}, Score: ${animeScore[1]}`)
                .addField(`#3: ${animeNames[2]}`, `Type: ${animeType[2]}, Episodes: ${animeEpisodes[2]}, Score: ${animeScore[2]}`)
                .addField(`#4: ${animeNames[3]}`, `Type: ${animeType[3]}, Episodes: ${animeEpisodes[3]}, Score: ${animeScore[3]}`)
                .addField(`#5: ${animeNames[4]}`, `Type: ${animeType[4]}, Episodes: ${animeEpisodes[4]}, Score: ${animeScore[4]}`)
                .addField(`#6: ${animeNames[5]}`, `Type: ${animeType[5]}, Episodes: ${animeEpisodes[5]}, Score: ${animeScore[5]}`)
                .addField(`#7: ${animeNames[6]}`, `Type: ${animeType[6]}, Episodes: ${animeEpisodes[6]}, Score: ${animeScore[6]}`)
                .addField(`#8: ${animeNames[7]}`, `Type: ${animeType[7]}, Episodes: ${animeEpisodes[7]}, Score: ${animeScore[7]}`)
                .addField(`#9: ${animeNames[8]}`, `Type: ${animeType[8]}, Episodes: ${animeEpisodes[8]}, Score: ${animeScore[8]}`)
                .addField(`#10: ${animeNames[9]}`, `Type: ${animeType[9]}, Episodes: ${animeEpisodes[9]}, Score: ${animeScore[9]}`)
                .addField(`#11: ${animeNames[10]}`, `Type: ${animeType[10]}, Episodes: ${animeEpisodes[10]}, Score: ${animeScore[10]}`)
                .addField(`#12: ${animeNames[11]}`, `Type: ${animeType[11]}, Episodes: ${animeEpisodes[11]}, Score: ${animeScore[11]}`)
                .addField(`#13: ${animeNames[12]}`, `Type: ${animeType[12]}, Episodes: ${animeEpisodes[12]}, Score: ${animeScore[12]}`)
                .addField(`#14: ${animeNames[13]}`, `Type: ${animeType[13]}, Episodes: ${animeEpisodes[13]}, Score: ${animeScore[13]}`)
                .addField(`#15: ${animeNames[14]}`, `Type: ${animeType[14]}, Episodes: ${animeEpisodes[14]}, Score: ${animeScore[14]}`)
                .addField(`#16: ${animeNames[15]}`, `Type: ${animeType[15]}, Episodes: ${animeEpisodes[15]}, Score: ${animeScore[15]}`)
                .addField(`#17: ${animeNames[16]}`, `Type: ${animeType[16]}, Episodes: ${animeEpisodes[16]}, Score: ${animeScore[16]}`)
                .addField(`#18: ${animeNames[17]}`, `Type: ${animeType[17]}, Episodes: ${animeEpisodes[17]}, Score: ${animeScore[17]}`)
                .addField(`#19: ${animeNames[18]}`, `Type: ${animeType[18]}, Episodes: ${animeEpisodes[18]}, Score: ${animeScore[18]}`)
                .addField(`#20: ${animeNames[19]}`, `Type: ${animeType[19]}, Episodes: ${animeEpisodes[19]}, Score: ${animeScore[19]}`)
                .addField(`#21: ${animeNames[20]}`, `Type: ${animeType[20]}, Episodes: ${animeEpisodes[20]}, Score: ${animeScore[20]}`)
                .addField(`#22: ${animeNames[21]}`, `Type: ${animeType[21]}, Episodes: ${animeEpisodes[21]}, Score: ${animeScore[21]}`)
                .addField(`#23: ${animeNames[22]}`, `Type: ${animeType[22]}, Episodes: ${animeEpisodes[22]}, Score: ${animeScore[22]}`)
                .addField(`#24: ${animeNames[23]}`, `Type: ${animeType[23]}, Episodes: ${animeEpisodes[23]}, Score: ${animeScore[23]}`)
                .addField(`#25: ${animeNames[24]}`, `Type: ${animeType[24]}, Episodes: ${animeEpisodes[24]}, Score: ${animeScore[24]}`)
                .setFooter('/gettop anime command');

                return interaction.reply({ embeds: [embed] });
            
        }
        else if (type === 'manga') {
            if (subtype == null) {
                data = await jikanjs.loadTop(type, 1);
            }
            else if (subtype === 'manga' || subtype === 'novel' || subtype === 'lightnovel' || subtype === 'manhwa' || subtype === 'manhua') {
                data = await jikanjs.loadTop(type, 1, subtype);
                
            }
            else {
                return interaction.reply('Give a valid subtype option');
            }

            // Creating arrays to store each manga's crucial information to make an embed; rank is index + 1
            const mangaNames = []; 
            const mangaType = [];
            const mangaScore = [];
            const mangaChapters = [];

            // loop runs for number of elements in data object; should be 25
            for (let i = 0; i < data.data.length; i++) {
                mangaNames[i] = data.data[i].title;
                mangaType[i] = data.data[i].type;
                mangaScore[i] = data.data[i].score;
                if (data.data[i].chapters == null) {
                    mangaChapters[i] = 'Unknown';
                }
                else {
                    mangaChapters[i] = data.data[i].chapters;
                }
                
            }

            let title = ' ';
            if (subtype == null) {
                title = 'Top 25 Manga';
            }
            else {
                const subtypeTitle = subtype[0].toUpperCase() + subtype.slice(1);
                title = `Top 25 ${subtypeTitle} Manga`;
            }

            const embed = new MessageEmbed()
                .setTitle(title)
                .setColor('#F4CA2C')
                .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png')
                .addField(`#1: ${mangaNames[0]}`, `Type: ${mangaType[0]}, Chapters: ${mangaChapters[0]}, Score: ${mangaScore[0]}`)
                .addField(`#2: ${mangaNames[1]}`, `Type: ${mangaType[1]}, Chapters: ${mangaChapters[1]}, Score: ${mangaScore[1]}`)
                .addField(`#3: ${mangaNames[2]}`, `Type: ${mangaType[2]}, Chapters: ${mangaChapters[2]}, Score: ${mangaScore[2]}`)
                .addField(`#4: ${mangaNames[3]}`, `Type: ${mangaType[3]}, Chapters: ${mangaChapters[3]}, Score: ${mangaScore[3]}`)
                .addField(`#5: ${mangaNames[4]}`, `Type: ${mangaType[4]}, Chapters: ${mangaChapters[4]}, Score: ${mangaScore[4]}`)
                .addField(`#6: ${mangaNames[5]}`, `Type: ${mangaType[5]}, Chapters: ${mangaChapters[5]}, Score: ${mangaScore[5]}`)
                .addField(`#7: ${mangaNames[6]}`, `Type: ${mangaType[6]}, Chapters: ${mangaChapters[6]}, Score: ${mangaScore[6]}`)
                .addField(`#8: ${mangaNames[7]}`, `Type: ${mangaType[7]}, Chapters: ${mangaChapters[7]}, Score: ${mangaScore[7]}`)
                .addField(`#9: ${mangaNames[8]}`, `Type: ${mangaType[8]}, Chapters: ${mangaChapters[8]}, Score: ${mangaScore[8]}`)
                .addField(`#10: ${mangaNames[9]}`, `Type: ${mangaType[9]}, Chapters: ${mangaChapters[9]}, Score: ${mangaScore[9]}`)
                .addField(`#11: ${mangaNames[10]}`, `Type: ${mangaType[10]}, Chapters: ${mangaChapters[10]}, Score: ${mangaScore[10]}`)
                .addField(`#12: ${mangaNames[11]}`, `Type: ${mangaType[11]}, Chapters: ${mangaChapters[11]}, Score: ${mangaScore[11]}`)
                .addField(`#13: ${mangaNames[12]}`, `Type: ${mangaType[12]}, Chapters: ${mangaChapters[12]}, Score: ${mangaScore[12]}`)
                .addField(`#14: ${mangaNames[13]}`, `Type: ${mangaType[13]}, Chapters: ${mangaChapters[13]}, Score: ${mangaScore[13]}`)
                .addField(`#15: ${mangaNames[14]}`, `Type: ${mangaType[14]}, Chapters: ${mangaChapters[14]}, Score: ${mangaScore[14]}`)
                .addField(`#16: ${mangaNames[15]}`, `Type: ${mangaType[15]}, Chapters: ${mangaChapters[15]}, Score: ${mangaScore[15]}`)
                .addField(`#17: ${mangaNames[16]}`, `Type: ${mangaType[16]}, Chapters: ${mangaChapters[16]}, Score: ${mangaScore[16]}`)
                .addField(`#18: ${mangaNames[17]}`, `Type: ${mangaType[17]}, Chapters: ${mangaChapters[17]}, Score: ${mangaScore[17]}`)
                .addField(`#19: ${mangaNames[18]}`, `Type: ${mangaType[18]}, Chapters: ${mangaChapters[18]}, Score: ${mangaScore[18]}`)
                .addField(`#20: ${mangaNames[19]}`, `Type: ${mangaType[19]}, Chapters: ${mangaChapters[19]}, Score: ${mangaScore[19]}`)
                .addField(`#21: ${mangaNames[20]}`, `Type: ${mangaType[20]}, Chapters: ${mangaChapters[20]}, Score: ${mangaScore[20]}`)
                .addField(`#22: ${mangaNames[21]}`, `Type: ${mangaType[21]}, Chapters: ${mangaChapters[21]}, Score: ${mangaScore[21]}`)
                .addField(`#23: ${mangaNames[22]}`, `Type: ${mangaType[22]}, Chapters: ${mangaChapters[22]}, Score: ${mangaScore[22]}`)
                .addField(`#24: ${mangaNames[23]}`, `Type: ${mangaType[23]}, Chapters: ${mangaChapters[23]}, Score: ${mangaScore[23]}`)
                .addField(`#25: ${mangaNames[24]}`, `Type: ${mangaType[24]}, Chapters: ${mangaChapters[24]}, Score: ${mangaScore[24]}`)
                .setFooter('/gettop manga command');

                return interaction.reply({ embeds: [embed] });

        }
        else {
            return interaction.reply('Give a valid type option');
        }
    },
};