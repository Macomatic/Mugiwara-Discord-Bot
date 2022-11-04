const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wyr')
        .setDescription('Gives a would you rather'),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // api call
        const url = 'https://api.popcat.xyz/wyr';
        fetch(url)
            .then(response => response.json())
            .then(json => {
                const embed = new MessageEmbed()
                    .setTitle('Would you rather?') 
                    .addField('A', json.ops1.charAt(0).toUpperCase() + json.ops1.slice(1), false)
                    .addField('B', json.ops2.charAt(0).toUpperCase() + json.ops2.slice(1), false)
                    .setColor('#B3BF61')
                    .setFooter({
                        text: '/wyr command', 
                });

                interaction.editReply({ embeds: [embed] });
            })
            .catch((error) => {
                interaction.editReply(error);
                
            });

    },
};