const { GoogleGenAI } = require("@google/genai");
const { getChat } = require('./memory');

function getAI() {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY");
    }

    return new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });
}

async function askAI(userId, question, fileData = null) {
    const ai = getAI();
    const parts = [{ text: question }];

    if (fileData) {

        if (fileData.type === "textChunks") {
            const combinedText = fileData.chunks.join("\n\n");

            parts.push({
                text: `\nDocument Content:\n${combinedText}`
            });
        }

        if (fileData.type === "image") {
            parts.push({
                inlineData: {
                    mimeType: fileData.mimeType,
                    data: fileData.data
                }
            });
        }

        if (fileData.type === "text") {
            parts.push({
                text: `\nDocument Content:\n${fileData.content}`
            });
        }
    }

    const chat = getChat(userId, ai);

    const response = await chat.sendMessage({
    message: parts
    });

    return response.text;
}

module.exports = { askAI };