const { prefix } = require('../server'); // Adjust the path as needed

console.log('Hello implemented, prefix is', prefix);

module.exports = (client) => {
  client.on('messageCreate', (message) => {
    // Ensure the bot is listening to messages
    console.log('Received message:', message.content);

    if (!message.content.startsWith(prefix)) return;

    // Split the command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Debugging: log the command and arguments
    console.log('Command:', command);
    console.log('Arguments:', args);

    if (command === 'hello') {
      // Ensure the bot is attempting to respond to the !hello command
      console.log('Responding to !hello command');
      message.reply('world');
    }
  });
};
