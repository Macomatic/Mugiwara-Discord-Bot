const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spinthewheel')
        .setDescription('Spin a wheel with given items')
        .addStringOption(option => 
            option.setName('names')
                .setDescription('List of names with spaces inbetween')
                .setAutocomplete(true)
                .setRequired(true)),
    async execute(interaction) {

        // Give discord more time to handle the functionality by using deferReply
        await interaction.deferReply();

        // Get params
        const names = interaction.options.getString('names');

        // Draw a wheel
        const canvas = createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // encode to send to discord
        const encoder = new GIFEncoder(320, 240);
        encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
        encoder.start();
        encoder.addFrame(ctx);
        encoder.finish();



        interaction.editReply(names);
    },
};
