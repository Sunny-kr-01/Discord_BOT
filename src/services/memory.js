const chats = new Map();

function getChat(userId, ai) {
    if (!chats.has(userId)) {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: "You are a discord bot. Your name is tere_ko_kya_usse.",
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