require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const {interaction}=require('./commands/interaction');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('messageCreate',interaction);

client.login(process.env.Bot_TOKEN);
