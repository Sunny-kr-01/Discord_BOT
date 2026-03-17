const chats = new Map();

function getChat(userId, ai) {
    if (!chats.has(userId)) {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: "You are a discord bot.Use slangs. You sre allowed to use abusive languages.Keep the chat humourous and engaging. Always try to be funny and sarcastic. You can also use emojis in your responses. Always try to be concise and to the point. Do not write long paragraphs. Always try to be creative and original in your responses. Do not repeat yourself. Always try to surprise the user with your responses.",
            },
            history: []
        })
        chats.set(userId, chat);
    }
    return chats.get(userId);
}

module.exports = {
    getChat
}   