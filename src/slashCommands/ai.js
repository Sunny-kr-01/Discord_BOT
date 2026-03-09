const { SlashCommandBuilder } = require('discord.js');
const { askAI } = require('../services/aiService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ai')
        .setDescription('Ask AI anything')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question')
                .setRequired(true)
        ),

    async execute(interaction) {

        const question = interaction.options.getString('question');
        await interaction.reply('🤔 Thinking...');

        const answer = await askAI(question);

        const chunks = answer.match(/[\s\S]{1,2000}/g) || ["No response"];

        await interaction.editReply(chunks.shift());

        for (const chunk of chunks) {
            await interaction.followUp(chunk);
        }

    }
};