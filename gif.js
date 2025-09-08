<<<<<<< HEAD
// gif.js - Discord GIF Bot
require('dotenv').config({ path: './gif.env' }); // Load environment variables

const { Client, GatewayIntentBits, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const gifsFolder = path.join(__dirname, 'Gifs');

// Helper: get all GIFs
function getGifs() {
    return fs.readdirSync(gifsFolder).filter(file => file.endsWith('.gif'));
}

// When bot is ready
client.once(Events.ClientReady, () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Handle interactions
client.on(Events.InteractionCreate, async interaction => {

    // Slash command /picker
    if (interaction.isChatInputCommand() && interaction.commandName === 'picker') {
        const gifs = getGifs();
        if (!gifs.length) return interaction.reply({ content: 'No GIFs available.', ephemeral: true });

        await interaction.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder().setTitle('Select a GIF').setColor('Blue');
        const attachments = gifs.map(gif => new AttachmentBuilder(path.join(gifsFolder, gif), { name: gif }));

        gifs.forEach(gif => embed.addFields({ name: gif.replace('.gif',''), value: `[Preview](attachment://${gif})`, inline: true }));

        const rows = [];
        for (let i = 0; i < gifs.length; i += 5) {
            const row = new ActionRowBuilder();
            gifs.slice(i, i + 5).forEach(gif => {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`gif_${gif}`)
                        .setLabel(gif.replace('.gif',''))
                        .setStyle(ButtonStyle.Primary)
                );
            });
            rows.push(row);
        }

        await interaction.editReply({ embeds: [embed], components: rows, files: attachments });
    }

    // Button click
    if (interaction.isButton() && interaction.customId.startsWith('gif_')) {
        const gifName = interaction.customId.replace('gif_', '');
        const gifPath = path.join(gifsFolder, gifName);

        if (!fs.existsSync(gifPath)) return interaction.reply({ content: 'GIF not found.', ephemeral: true });

        await interaction.channel.send({ content: `${interaction.user} sent this:`, files: [gifPath] });
        await interaction.deleteReply().catch(() => {});
    }
});

// Login bot
client.login(process.env.TOKEN);
=======
// gif.js - Discord GIF Bot
require('dotenv').config({ path: './gif.env' }); // Load environment variables

const { Client, GatewayIntentBits, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const gifsFolder = path.join(__dirname, 'Gifs');

// Helper: get all GIFs
function getGifs() {
    return fs.readdirSync(gifsFolder).filter(file => file.endsWith('.gif'));
}

// When bot is ready
client.once(Events.ClientReady, () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Handle interactions
client.on(Events.InteractionCreate, async interaction => {

    // Slash command /picker
    if (interaction.isChatInputCommand() && interaction.commandName === 'picker') {
        const gifs = getGifs();
        if (!gifs.length) return interaction.reply({ content: 'No GIFs available.', ephemeral: true });

        await interaction.deferReply({ ephemeral: true });

        const embed = new EmbedBuilder().setTitle('Select a GIF').setColor('Blue');
        const attachments = gifs.map(gif => new AttachmentBuilder(path.join(gifsFolder, gif), { name: gif }));

        gifs.forEach(gif => embed.addFields({ name: gif.replace('.gif',''), value: `[Preview](attachment://${gif})`, inline: true }));

        const rows = [];
        for (let i = 0; i < gifs.length; i += 5) {
            const row = new ActionRowBuilder();
            gifs.slice(i, i + 5).forEach(gif => {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`gif_${gif}`)
                        .setLabel(gif.replace('.gif',''))
                        .setStyle(ButtonStyle.Primary)
                );
            });
            rows.push(row);
        }

        await interaction.editReply({ embeds: [embed], components: rows, files: attachments });
    }

    // Button click
    if (interaction.isButton() && interaction.customId.startsWith('gif_')) {
        const gifName = interaction.customId.replace('gif_', '');
        const gifPath = path.join(gifsFolder, gifName);

        if (!fs.existsSync(gifPath)) return interaction.reply({ content: 'GIF not found.', ephemeral: true });

        await interaction.channel.send({ content: `${interaction.user} sent this:`, files: [gifPath] });
        await interaction.deleteReply().catch(() => {});
    }
});

// Login bot
client.login(process.env.TOKEN);
>>>>>>> 227cfb4ce0ba05ff8e2f8aee1b5284f3e0a5adfa
