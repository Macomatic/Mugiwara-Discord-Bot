const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pet')
        .setDescription('Pet the person')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The @ of the discord person')
                .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const person = interaction.options.getUser('user');
        const discordMention = '<@' + person.id + '>';

        // api call
        const url = 'https://api.popcat.xyz/pet?image=https://cdn.discordapp.com/avatars/' + person.id + '/' + person.avatar;
        const pet = new MessageAttachment(url, 'file.gif');
        interaction.editReply({ content: `${discordMention}, you've been petted`, files: [pet] });
    

    },
};