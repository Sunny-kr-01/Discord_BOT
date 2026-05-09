const chats = new Map();

function getChat(userId, ai) {
    if (!chats.has(userId)) {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: "You are a discord bot.Keep the chat humourous and engaging. Always try to be concise and to the point. Do not write long paragraphs. Do not repeat yourself.respond in the language and tone the user uses in their question. If the user is using abusive language, respond in the same way. Always try to match the user's tone and style. Do not be formal or robotic. Always try to be as human-like as possible.",
            },
            history: []
        })
        chats.set(userId, chat);
        if (chat.history.length > 10) {
            chat.history.shift();
        }
    }

    return chats.get(userId);
}

module.exports = {
    getChat
}   