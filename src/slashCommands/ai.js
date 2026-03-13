const { SlashCommandBuilder } = require('discord.js');
const { askAI } = require('../services/aiService');
const { downloadFile } = require('../utils/downloadFile');
const imageProcessor=require('../processors/imageProcessor');
const pdfProcessor = require('../processors/pdfProcessor');
const pptProcessor = require('../processors/pptProcessor');

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

        const file = interaction.options.getAttachment("file");
        let processedData;

        if (file) {

            const buffer = await downloadFile(file.url);


            if (file.contentType.startsWith("image/")) {
                processedData = await imageProcessor(buffer, file.contentType);
            }

            else if (file.contentType === "application/pdf") {
                processedData = await pdfProcessor(buffer);
            }

            else if (
                file.contentType ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ) {
                processedData = await pptProcessor(buffer);
            }

        }

        const userId = interaction.user.id;

        const answer = await askAI(userId, question, processedData);

        const chunks = answer.match(/[\s\S]{1,2000}/g) || ["No response"];

        await interaction.editReply(chunks.shift());

        for (const chunk of chunks) {
            await interaction.followUp(chunk);
        }

    }
};