const prefix = '!';

module.exports = async (client, message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    // Argument validation
    if (command.args && !args.length) {
        let reply = `❌ You didn't provide arguments.\n`;
        reply += `Usage: ${command.usage}`;
        return message.reply(reply);
    }

    // Safe execution (middleware protection)
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('⚠️ Something went wrong while executing this command.');
    }
};