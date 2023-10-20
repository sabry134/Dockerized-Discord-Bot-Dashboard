const { TextChannel } = require('discord.js');

module.exports = async (msg) => {
  if (msg.content === "!ticket") {
    // Check if the message author is a guild member
    if (msg.member) {
      // Create a new text channel with a specific name
      const channelName = `ticket-${msg.author.username}`;
      const guild = msg.guild;
      
      try {
        const newChannel = await guild.channels.create(channelName, {
          type: 'text',
          permissionOverwrites: [
            {
              id: msg.guild.id,
              deny: ['VIEW_CHANNEL'],
            },
            {
              id: msg.author.id,
              allow: ['VIEW_CHANNEL'],
            },
          ],
        });
        
        // Check if the new channel was created successfully
        if (newChannel instanceof TextChannel) {
          // Send a welcome message in the new channel
          await newChannel.send(`Welcome to your ticket channel, ${msg.author}`);
          
          // Reply to the user in the original channel with the channel mention
          msg.reply(`A new ticket channel has been created for you: ${newChannel}`);
        } else {
          // Handle the case where the new channel is not a TextChannel
          msg.reply('Failed to create a ticket channel. Please contact an administrator.');
        }
      } catch (error) {
        // Handle errors that occur during channel creation
        console.error(error);
        msg.reply(`An error occurred while creating the ticket channel: ${error.message}. Please contact an administrator.`);
      }
    } else {
      msg.reply('You are not a member of this server.');
    }
  }
};
