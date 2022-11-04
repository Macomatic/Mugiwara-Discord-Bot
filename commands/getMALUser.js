const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const jikanjs = require('@mateoaranda/jikanjs');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getmaluser')
        .setDescription('Gives the MAL account for the provided username')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('MAL username')
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        let username = (interaction.options.getString('username')).toLowerCase();
        username = username.charAt(0).toUpperCase() + username.slice(1);

        // calling the api and grabbing profile fields
        try {
            const { data } = await jikanjs.loadUser(username);
            const imageUrl = data.images.jpg.image_url;
            const profileUrl = data.url;
            const embed = new MessageEmbed()
                .setTitle(`${username}'s MAL Account`)
                .setDescription(`[MAL Profile](${profileUrl})`)
                .setImage(imageUrl)
                .addField('Anime List', `[Link](https://myanimelist.net/animelist/${username})`, true)
                .addField('Manga List', `[Link](https://myanimelist.net/mangalist/${username})`, true)
                .setFooter({
                    text: '/getmaluser command',
                });
            interaction.editReply({ embeds: [embed] });
        }

        catch (error) {
            interaction.editReply('I could not find a MAL account with that username');
        }
    },
};