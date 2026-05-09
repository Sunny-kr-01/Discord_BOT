const { SlashCommandBuilder } = require('discord.js');
const { getChat } = require('../services/memory');
const { GoogleGenAI } = require("@google/genai");

function getAI() {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY");
    }

    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Reset the AI chat history for this user'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const ai= getAI();
        const chat = getChat(userId, ai);
        chat.history = [];
        await interaction.reply('Chat history reset.');
    }
};