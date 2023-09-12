const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const cheerio = require('cheerio');
const { getFirestore } = require('firebase-admin/firestore');

const getJoinLink = async (steam_id) => {
    const { data } = await axios.get(`https://steamcommunity.com/id/${steam_id}/`);
    const $ = cheerio.load(data);

    return $('div.profile_in_game_joingame > a').first().attr('href');
};

const getSteamId = async (discord_user_id) => {
    const db = getFirestore();
    return db.collection('discord_user_id').doc(discord_user_id).get();
};

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('lobby')
        .setDescription('Searches for join game link and replies'),
    async execute(interaction) {
        const steamId = await getSteamId(interaction.user.id);
        if (!steamId.exists) {
            await interaction.reply(
                `Steam ID not found for ${interaction.user.username}. Type \`/steamid\` and enter your full Steam profile URL, e.g. \`/steamid https://steamcommunity.com/id/Ashiro12138/\``,
            );
            await interaction.channel.send(
                'https://raw.githubusercontent.com/ctmatthews/sglobbylink-discord.py/master/steam_url_instructions.jpg',
            );
            return;
        }
        const link = await getJoinLink(steamId.data().steam_id);
        if (link) {
            await interaction.reply(
                `${interaction.user.username}'s BlazBlue Centralfiction lobby: ${link}`,
            );
        } else {
            await interaction.reply(
                `Lobby not found for ${interaction.user.username}: Steam thinks you're offline. Make sure you're connected to Steam, and not set to Appear Offline on your friends list.`,
            );
        }
    },
};
