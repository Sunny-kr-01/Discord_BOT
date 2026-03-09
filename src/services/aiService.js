const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function askAI(prompt, retries = 2) {
  try {

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    return response.text;

  } catch (error) {

    if (retries > 0 && error.status === 503) {
      console.log("Retrying AI request...");
      await new Promise(r => setTimeout(r, 2000));
      return askAI(prompt, retries - 1);
    }

    return "⚠️ AI servers are busy. Try again in a moment.";
  }
}

module.exports = {
  askAI,
};