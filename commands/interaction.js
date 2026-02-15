function interaction(message) {
    if (message.content === 'ping') {
        message.reply('pong');
    }
    if(!message.author.bot){
        message.reply('Hey from BÒT');
    }
}

module.exports = {
  interaction
}
