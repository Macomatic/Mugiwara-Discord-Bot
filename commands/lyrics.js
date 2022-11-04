const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Gets the lyrics of a song')
        .addStringOption(option => 
            option.setName('song_name')
                .setDescription('Name of the desired song')
                .setRequired(true)),
    async execute(interaction) {

        const songName = interaction.options.getString('song_name');
        const params = encodeURIComponent(songName);

        // api call
        const uri = 'https://api.popcat.xyz/lyrics?song=' + params;
        const user = interaction.options.getUser('user') || interaction.user;

        // fetch the api
        fetch(uri)
            .then(response => response.json())
            .then(json => {
                if (Object.prototype.hasOwnProperty.call(json, 'error')) {
                    interaction.reply({ content: 'Please give a valid song name!', ephemeral: true });
                }
                else {

                    // First, we need to handle long lyrics and divy them up into sections because discord has a char limit
                    let lyrics = json.lyrics;
                    let lyricSection = '';
                    let isFormatted, idealLength = false;
                    const lyricsEB = [];

                    const firstEmbed = new MessageEmbed()
                        .setTitle(`${json.title}`)
                        .setDescription(`${json.artist}`)
                        .addField('Requested By', user.username, true)
                        .setColor('#805183')
                        .setThumbnail(json.image);

                    lyricsEB.push(firstEmbed);

                    while (!isFormatted) {
                        
                        // if the remaning lyrics are still above 1k chars, then we need to break it down
                        if (lyrics.length > 1000) {
                            idealLength = false;
                            while (!idealLength) {
                                const index = lyrics.indexOf('\n');
                                lyricSection += lyrics.substring(0, index) + '\n';
                                lyrics = lyrics.substring(index + 1);

                                // if our lyric section is big enough, lets create an embed with it, save it, and start to create another section
                                if (lyricSection.length > 900 && lyricSection.length < 1000) {
                                    idealLength = true;
                                    const embed = new MessageEmbed()
                                        .setTitle('Lyrics')
                                        .setDescription(`${lyricSection}`)
                                        .setColor('#805183');

                                    lyricsEB.push(embed);
                                    lyricSection = '';
                                }
                            }
                        }
                        // otherwise, it is good enough to be submitted
                        else {
                            isFormatted = true;
                        }
                    }


                    // final embed with last lyrics and some footer stuff ig
                    const lastEmbed = new MessageEmbed()
                        .setTitle('Lyrics')
                        .setDescription(`${lyrics}`)
                        .setColor('#805183')
                        .setFooter({
                            text: '/lyrics command', 
                        });

                    lyricsEB.push(lastEmbed);

                    interaction.reply({ embeds: lyricsEB });
                }
                

            })
            .catch((error) => {
                interaction.reply(error);
            });
    },
};