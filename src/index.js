require('dotenv').config();

const fs = require('fs');
const path = require('path');

const { Client, GatewayIntentBits } = require('discord.js');

const commandHandler = require('./handlers/commandHandler');
const readyEvent = require('./events/ready');
const messageEvent = require('./events/messageCreate');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load commands
commandHandler(client);

client.slashCommands = new Map();
const slashFiles = fs.readdirSync(path.join(__dirname, './slashCommands')).filter(f => f.endsWith('.js'));

for (const file of slashFiles) {
    const command = require(`./slashCommands/${file}`);
    client.slashCommands.set(command.data.name, command);
}

// Events
// client.once('ready', () => readyEvent(client));
client.once("clientReady", () => {
  console.log("Bot is ready");
});
client.on('messageCreate', message => messageEvent(client, message));

const interactionEvent = require('./events/interactionCreate');
client.on('interactionCreate', i => interactionEvent(client, i));

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

client.login(process.env.Bot_TOKEN);


