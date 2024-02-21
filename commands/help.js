const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Gives info on all commands')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Options: general, meme, anime, valorant, steam')
                .setRequired(true)),

    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // Grabbing the crosshair code
        const type = interaction.options.getString('type');

        // .addFields({ name: 'temp', value: 'val' })

        // 8ball, help, lyrics, math, morsecode, movie, randomcar, randomfact, randomnumber, weather, ping -> 11
        const generalEmbed = new MessageEmbed()
            .setColor('LIGHT_GREY')
            .setTitle('General Commands')
            .addFields({ name: '/8ball [question]', value: 'Gives an answer to a question using sentiment analysis' })
            .addFields({ name: '/help [type]', value: 'ur using the command u donut stop reading' })
            .addFields({ name: '/lyrics [song_name]', value: 'Gets the lyrics for the song' })
            .addFields({ name: '/math [operation] [a] [b]', value: 'Computes the operation with values a and b' })
            .addFields({ name: '/morsecode [message]', value: 'Converts a message into morse code' })
            .addFields({ name: '/movie [movie_name]', value: 'Gets info on a movie' })
            .addFields({ name: '/randomcar', value: 'Gives a randomcar' })
            .addFields({ name: '/randomfact', value: 'Gives a random fact' })
            .addFields({ name: '/rng [range]', value: 'Gives a random number up to the range value' })
            .addFields({ name: '/weather [city]', value: 'Gives approx. weather conditions for the provided city' })
            .addFields({ name: '/ping', value: 'pong' })
            .setFooter({ text: 'General commands' })
            .setTimestamp();

        // alert, clown, drakememe, drip, jail, joke, meme, oogway, pet, pickupline, ship, showerthoughts, wanted, wouldyourather -> 14
        const memeEmbed = new MessageEmbed()
            .setColor('BLURPLE')
            .setTitle('Meme Commands')
            .addFields({ name: '/alert [text]', value: 'Generates an iphone notification with the provided text' })
            .addFields({ name: '/clown [@user]', value: 'Generates the clown meme with the provided discord user' })
            .addFields({ name: '/drakememe [text1] [text2]', value: 'Generates the drake looking away (first text) and approval (second text) meme' })
            .addFields({ name: '/drip', value: 'if you dont know u got no drip' })
            .addFields({ name: '/jail [@user]', value: 'Use it when someone says smth sus' })
            .addFields({ name: '/joke', value: 'Generates a joke' })
            .addFields({ name: '/meme', value: 'Generates a random meme' })
            .addFields({ name: '/oogway [text]', value: 'Generates an oogway meme with the provided text' })
            .addFields({ name: '/pet [@user]', value: 'Creates a petting gif with the provided user' })
            .addFields({ name: '/pickupline [@user]', value: 'Creates a pickup line towards the provided user' })
            .addFields({ name: '/ship [@user1] [@user2]', value: 'Creates a picture shipping the two provided users' })
            .addFields({ name: '/showerthoughts', value: 'Generates a random shower thought' })
            .addFields({ name: '/wanted [@user]', value: 'Generates a wanted poster for the user' })
            .addFields({ name: '/wyr', value: 'Generates a would you rather scenario' })
            .setFooter({ text: 'Meme commands' })
            .setTimestamp();

        // findanimebypicture, getanimeseason, getmaluser, getrandommalinfo, gettopmalinfo -> 5
        const animeEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Anime Commands')
            .addFields({ name: '/animebypicture [url]', value: 'Uses AI to determine the anime from a picture' })
            .addFields({ name: '/getanimeseason [current/upcoming]', value: 'Gets the curr/upcoming season of anime' })
            .addFields({ name: '/getmaluser [username]', value: 'Gets the mal profile for the username' })
            .addFields({ name: '/getrandommal [type]', value: 'Gets a random piece of mal info based on input (anime, manga, character, people)' })
            .addFields({ name: '/gettopmal [anime/manga]', value: 'Gets the top anime/manga dependent on param input' })
            .setFooter({ text: 'Anime commands' })
            .setTimestamp();

        // 
        const steamEmbed = new MessageEmbed()
            .setColor('NAVY')
            .setTitle('Steam Commands')

            .setFooter({ text: 'Steam commands' })
            .setTimestamp();

        // getvalaccount, getvalmatches, getvalsession, getvalcrosshair, getvalnews, randomcrosshair -> 6
        const valorantEmbed = new MessageEmbed()
            .setColor('LUMINOUS_VIVID_PINK')
            .setTitle('Valorant Commands')
            .addFields({ name: '/getvalaccount [username] [tag]', value: 'Displays the valorant account, rank, MMR, and level from the username and tag' })
            .addFields({ name: '/getvalmatches [username] [tag]', value: 'Displays the last 5 matches for the provided valorant account' })
            .addFields({ name: '/getvalsession [username] [tag]', value: 'Displays the recent session (consecutive games) statistics for the provided valorant account' }) 
            .addFields({ name: '/getvalcrosshair [code]', value: 'Displays the valorant crosshair with the provided code' })
            .addFields({ name: '/getvalnews [category]', value: 'Displays valorant news based on the provided category' })
            .addFields({ name: '/randomvalcrosshair', value: 'Generates a random valorant crosshair' })   
            .setFooter({ text: 'Valorant commands' })
            .setTimestamp();

        // Determining which embed to display based on param
        if (type.toUpperCase() === 'VALORANT' || type.toUpperCase() === 'VAL') {
            interaction.editReply({ embeds: [valorantEmbed] });
        }
        else if (type.toUpperCase() === 'GENERAL' || type.toUpperCase() === 'GEN') {
            interaction.editReply({ embeds: [generalEmbed] });
        }
        else if (type.toUpperCase() === 'MEME' || type.toUpperCase() === 'MEM') {
            interaction.editReply({ embeds: [memeEmbed] });
        }
        else if (type.toUpperCase() === 'ANIME' || type.toUpperCase() === 'ANI') {
            interaction.editReply({ embeds: [animeEmbed] });
        }
        else if (type.toUpperCase() === 'STEAM' || type.toUpperCase() === 'PRAISEGABEN') {
            interaction.editReply({ embeds: [steamEmbed] });
        }
        else {
            interaction.editReply('Please give a valid help type');
        }

    },
};