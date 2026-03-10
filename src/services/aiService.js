const { GoogleGenAI } = require("@google/genai");
const {getChat}=require('./memory');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function askAI(userId,prompt, retries = 2) {
  try {

  const chat = getChat(userId, ai);

  const response = await chat.sendMessage({
    message: prompt
  }); 

  return response.text;

} catch (error) {

  console.error("AI ERROR:", error);

  const status =
    error?.status ||
    error?.response?.status ||
    error?.code;

  if (retries > 0 && status === 503) {
    console.log("Retrying AI request...");
    await new Promise(r => setTimeout(r, 2000));
    return askAI(userId, prompt, retries - 1);
  }

  return "⚠️ AI request failed. Please try again.";
}
}

module.exports = {
  askAI,
};