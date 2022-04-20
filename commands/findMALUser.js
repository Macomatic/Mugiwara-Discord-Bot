const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const jikanjs = require('@mateoaranda/jikanjs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('findmaluser')
        .setDescription('Gives the MAL account for the provided username')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('MAL username')
                .setRequired(true)),
    async execute(interaction) {
        let username = (interaction.options.getString('username')).toLowerCase();
        username = username.charAt(0).toUpperCase() + username.slice(1);

        // calling the api and grabbing profile fields
        try {
            const { data } = await jikanjs.loadUser(username);
            const imageUrl = data.images.jpg.image_url;
            const profileUrl = data.url;
            const embed = new MessageEmbed()
                .setTitle(`${username}'s MAL Account`)
                .setDescription(profileUrl)
                .setImage(imageUrl)
                .addField('Anime List', `[Link](https://myanimelist.net/animelist/${username})`, true)
                .addField('Manga List', `[Link](https://myanimelist.net/mangalist/${username})`, true)
                .setFooter('/findmaluser command');
            return interaction.reply({ embeds: [embed] });
        }

        catch (error) {
            return interaction.reply('I could not find a MAL account with that username');
        }
    },
};