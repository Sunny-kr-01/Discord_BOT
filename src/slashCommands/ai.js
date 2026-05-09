const { SlashCommandBuilder } = require('discord.js');
const { downloadFile } = require('../utils/downloadFile');
const imageProcessor = require('../processors/imageProcessor');
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
        const { askAI } = require('../services/aiService');

        try {
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

            const answer = await Promise.race([
                askAI(userId, question, processedData),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("AI timeout")), 15000)
                )
            ]);

            const chunks = answer.match(/[\s\S]{1,2000}/g) || ["No response"];

            await interaction.editReply(chunks.shift());

            for (const chunk of chunks) {
                await interaction.followUp(chunk);
            }
        } 
        catch (error) {
    console.error("AI COMMAND ERROR:", error);

    let errorMessage = "⚠️ Something went wrong.";

    try {

        if (error.message.includes("timeout")) {
            errorMessage = "⏳ AI took too long to respond.";
        }

        else if (
            error.message.includes("quota") ||
            error.message.includes("RESOURCE_EXHAUSTED")
        ) {
            errorMessage = "⚠️ AI quota reached. Try again later.";
        }

        else if (
            error.message.includes("Unsupported file")
        ) {
            errorMessage = "📄 Unsupported file type.";
        }

        else if (
            error.message.includes("File too large")
        ) {
            errorMessage = "📦 File too large.";
        }

        else if (
            error.message.includes("API key")
        ) {
            errorMessage = "🔑 API configuration issue.";
        }

        if (interaction.deferred) {
            await interaction.editReply(errorMessage);
        }

        else if (!interaction.replied) {
            await interaction.reply(errorMessage);
        }

    } catch (err) {
        console.error("Reply failed:", err);
    }
}

    }
};