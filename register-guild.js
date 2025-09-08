const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config({ path: './gif.env' });

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder()
    .setName('picker')
    .setDescription('Pick a GIF!')
    .setDefaultMemberPermissions(null) // <- This makes it available to everyone
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Clearing old guild commands...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] });

    console.log('Registering /picker for all members...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log('✅ /picker registered and visible to all members in the guild!');
  } catch (error) {
    console.error(error);
  }
})();
