const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function askAI(userId, question, fileData = null) {

    const parts = [];

    // user question
    parts.push({
        text: question
    });

    if (fileData) {

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

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
            role: "user",
            parts: parts
        }]
    });

    return response.text;
}

module.exports = { askAI };