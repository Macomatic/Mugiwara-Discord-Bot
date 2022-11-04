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

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // random number generation, dependent on end range
        const endRange = interaction.options.getNumber('range');
        const random = Math.floor(Math.random() * (endRange + 1));

        const embed = new MessageEmbed()
            .setTitle('The random number is: ')
            .setDescription(`${random}`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Number_theory_symbol.svg/1079px-Number_theory_symbol.svg.png')
            .setColor('#63CCDE')
            .setFooter({
                text: 'Random Number Generator',
            })
            .setTimestamp();

            interaction.editReply({ embeds: [embed] });
    },
};