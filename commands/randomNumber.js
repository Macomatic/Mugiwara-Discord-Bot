const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rng')
        .setDescription('Generates a random number from 0 to a given number')
        .addNumberOption(option => 
            option.setName('range')
                .setDescription('The end value of the range to get a random number from')
                .setRequired(true)),
    async execute(interaction) {
        const endRange = interaction.options.getNumber('range');
        const random = Math.floor(Math.random() * (endRange + 1));

        const embed = new MessageEmbed()
            .setTitle('The random number is: ')
            .setDescription(`${random}`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Number_theory_symbol.svg/1079px-Number_theory_symbol.svg.png')
            .setColor('#63CCDE')
            .setFooter('Random Number Generator')
            .setTimestamp();

            return interaction.reply({ embeds: [embed] });
    },
};