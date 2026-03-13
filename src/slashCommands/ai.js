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
        )
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('Optional file to provide context')
                .setRequired(false)
        ),

    async execute(interaction) {

        let question = interaction.options.getString('question');
        await interaction.deferReply();

        if (interaction.options.getAttachment('file')) {
            const file = interaction.options.getAttachment('file');
            console.log(file)
        }
        // if (interaction.options.getAttachment('file')) {
        //     const file = interaction.options.getAttachment('file');
        //     question += `\n\nContext from file (${file.name}): ${file.url}`;
        //     console.log(interaction.options.getAttachment('file'))
        // }

        const userId= interaction.user.id;

        const answer = await askAI(userId,question);

        const chunks = answer.match(/[\s\S]{1,2000}/g) || ["No response"];

        await interaction.editReply(chunks.shift());

        for (const chunk of chunks) {
            await interaction.followUp(chunk);
        }

    }
};