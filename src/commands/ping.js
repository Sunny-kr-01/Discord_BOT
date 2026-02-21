module.exports = {
    name: 'ping',
    description: 'Replies with pong',
    usage: '!ping',
    args: false,

    execute(message, args) {
        message.reply('Pong 🏓');
    }
};
