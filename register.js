// register.js - Discord Slash Command Registration
require('dotenv').config({ path: './gif.env' });

const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID; // optional, for testing

const commands = [
    new SlashCommandBuilder()
        .setName('picker')
        .setDescription('Open the GIF picker menu')
        .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        if (GUILD_ID) {
            console.log(`⏳ Registering /picker in guild ${GUILD_ID}...`);
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
            console.log("✅ /picker registered in the guild!");
        } else {
            console.log("⏳ Registering /picker globally...");
            await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
            console.log("✅ /picker registered globally!");
        }
    } catch (error) {
        console.error("❌ Error registering commands:", error);
    }
})();
