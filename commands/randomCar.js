const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomcar')
        .setDescription('Gets a random car'),
    async execute(interaction) {

        // api call
        const url = 'https://api.popcat.xyz/car';
        fetch(url)
            .then(response => response.json())
            .then(json => {

                // reformating car name to not include resolution of the image
                let carName = '';
                if (json.title.indexOf(']') == json.title.length - 1) {
                    carName = json.title.substring(0, json.title.indexOf('['));
                }
                else {
                    carName = json.title.substring(json.title.indexOf(']') + 1);
                }

                // embed for car in discord
                const embed = new MessageEmbed()
                    .setTitle(`${carName}`)
                    .setImage(json.image)
                    .setColor('#ABDFC5')
                    .setFooter({
                        text: '/randomCar command', 
                });

                interaction.reply({ embeds: [embed] });
            })
            .catch((error) => {
                interaction.reply(error);
            });

    },
};