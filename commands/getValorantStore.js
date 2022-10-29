const HenrikDevValorantAPI = require('unofficial-valorant-api');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getvalbundle')
        .setDescription('Gets the currently featured bundle in the Valorant store'),
    async execute(interaction) {

        // API call to get items in valorant store
        const VAPI = new HenrikDevValorantAPI();
        const items = await VAPI.getFeaturedItems({ version: 'v2' });
        console.log(items);
        

        // error handling
        const status = items.status;
        if (status == 400 || status == 404) {
            return interaction.reply('Not found, idk how you got this error');
        }

        else if (status == 403 || status == 503) {
            return interaction.reply('Riot API Maintenance: Try again later');
        }

        else if (status == 408) {
            return interaction.reply('Timeout while fetching data');
        }
        
        // parsing through payload to format data for use
        const totalSeconds = items.data[0].seconds_remaining;
        const days = Math.floor(totalSeconds / 86400);
        const remainingSeconds = totalSeconds - (days * 24 * 60 * 60);
        const hours = Math.floor(remainingSeconds / 3600);

        const duration = `${days} Days, ${hours} Hours remaining`;
        const price = `${items.data[0].bundle_price} Credits`;
        const bundle = items.data[0].items;

        // itemEmbed holds each individual item which will be added to the embeds array for each iteration of the loop
        let itemEmbed;
        const embeds = [];

        // current implementation on getting bundle name
            // not a permanent solution, issue is that when grabbing the bundle, it only gives UUID and not a name
            // no information on the bundle name unless you check the items' prefixes
            // will try to clean this portion up when i find a way to translate UUID to bundle name

        let name = '';
        for (let i = 0; i < bundle.length; i++) {
            if (bundle[i].type == 'skin_level') {
                name = (bundle[i].name).substring(0, (bundle[i].name).indexOf(' '));
                break;
            }
        }

        itemEmbed = new MessageEmbed()
            .setTitle(`${name} Bundle`)
            .addField('Total Price', `${price} Credits`, true)
            .addField('Duration', `${duration}`, true)
            .setColor('#ededed')
            .setFooter('/getValorantStore command');
        
        embeds.push(itemEmbed);

        // embed creation loop dependent on # of items in bundle
        for (let i = 0; i < bundle.length; i++) {
            const item = bundle[i];
            
            // reformating item type to better diction
            let type = item.type;
            if (type == 'buddy') {
                type = 'Gun Buddy';
            }
            else if (type == 'player_card') {
                type = 'Player Card';
            }
            else if (type == 'spray') {
                type = 'Spray';
            }
            else {
                type = 'Weapon Skin';
            }

            itemEmbed = new MessageEmbed()
                .setTitle(item.name)
                .addField('Type', `${type}`, true)
                .addField('Price', `${item.base_price} Credits`, true)
                .setColor('#e6b8b8')
                .setImage(item.image)
                .setFooter('/getValorantStore command');

            embeds.push(itemEmbed);
        }

        return interaction.reply({ embeds: embeds });


    },
};