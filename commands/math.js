const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
// const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Computes basic math operations')
        .addStringOption(option => 
            option.setName('operation')
                .setDescription('Options include: add, sub, div, mult, pow, mod')
                .setRequired(true))
        .addNumberOption(option => 
            option.setName('a')
                .setDescription('The first number sequentially prior to the operation call')
                .setRequired(true))
        .addNumberOption(option => 
            option.setName('b')
                .setDescription('The second number sequentially following the operation call')
                .setRequired(true)),
    async execute(interaction) {
        const operation = (interaction.options.getString('operation')).toLowerCase();
        let operationSymbol = ' ';
        const fNum = interaction.options.getNumber('a');
        const sNum = interaction.options.getNumber('b');


        // check if operation is valid
        let finalValue = 0;
        if (operation == 'add') {
            finalValue = fNum + sNum;
            operationSymbol = '+';
        }
        else if (operation == 'sub') {
            finalValue = fNum - sNum;
            operationSymbol = '-';
        }
        else if (operation == 'div') {
            finalValue = fNum / sNum;
            operationSymbol = '/';
        }
        else if (operation == 'mult') {
            finalValue = fNum * sNum;
            operationSymbol = 'x';
        }
        else if (operation == 'pow') {
            finalValue = fNum ** sNum;
            operationSymbol = '^';
        }
        else if (operation == 'mod') {
            finalValue = fNum % sNum;
            operationSymbol = '%';
        }
        // error checking
        else { 
            return interaction.reply('Please provide a valid operation from the options');
        }

        // creating the embed for the math result
        const embed = new MessageEmbed()
            .setTitle(`Value of ${fNum}${operationSymbol}${sNum}:`)
            .setDescription(`${finalValue}`)
            .setThumbnail('https://www.math.utah.edu/_resources/images/web-buttons/MajorsMinors.png')
            .setColor('#2B51DF')
            .setTimestamp();

            return interaction.reply({ embeds: [embed] });
    },
};