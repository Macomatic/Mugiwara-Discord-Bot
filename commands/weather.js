const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Displays the weather of a given location')
        .addStringOption(option => 
            option.setName('city')
                .setDescription('The city that you want the weather from')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('city');
        weather.find({ search: city, degreeType: 'C' }, function(error, result) {
            // error checking
            if (error) {
                return interaction.reply(error);
            }
            if (!city) {
                return interaction.reply('Please provide a city name');
            }
            if (result === undefined || result.length == 0) {
                return interaction.reply('Please give a valid location');
            }

            const currentStatus = result[0].current;
            const location = result[0].location;
            let embedColor = '#ffffff';
            
            // dynamically setting the color based on temperature ranges
            if (currentStatus.temperature < 0) {
                embedColor = '#349FE5';
            }
            else if (currentStatus.temperature >= 0 && currentStatus.temperature < 10) {
                embedColor = '#FCF146';
            }
            else if (currentStatus.temperature >= 10 && currentStatus.temperature < 20) {
                embedColor = '#DF8014';
            }
            else {
                embedColor = '#E82519';
            }

            // creating the embed for a nice discord format of the result
            const embed = new MessageEmbed()
                .setTitle(`Weather for ${currentStatus.observationpoint}`)
                .setDescription(currentStatus.skytext)
                .setThumbnail(currentStatus.imageUrl)
                .setColor(embedColor)
                .setTimestamp()
                .addField('Temperature: ', `${currentStatus.temperature}°C`, true)
                .addField('Wind Speed: ', currentStatus.winddisplay, true)
                .addField('Humidity: ', `${currentStatus.humidity}%`, true)
                .addField('Timezone: ', `UTC${location.timezone}`, true)
                .setFooter({
                    text: '/weather command',
                });

                return interaction.reply({ embeds: [embed] });

        });
    },
};