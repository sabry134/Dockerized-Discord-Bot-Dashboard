const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const helpCommand = require('./commands/help');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const accounts = [
  { username: 'user1', password: process.env.USER1_PASSWORD },
  { username: 'user2', password: process.env.USER2_PASSWORD },
  { username: 'user3', password: process.env.USER3_PASSWORD },
];

let botIsRunning = false;
let client = null;



app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const account = accounts.find((acc) => acc.username === username);

  if (account) {
    console.log('Stored Password:', account.password);
    console.log('Submitted Password:', password);

    if (account.password === password) {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Login failed - Incorrect password');
      res.status(401).json({ message: 'Incorrect password' });
    }
  } else {
    console.log('Login failed - User not found');
    res.status(401).json({ message: 'User not found' });
  }
});

app.post('/start', (req, res) => {
  if (botIsRunning) {
    res.status(200).json({ message: 'Bot is already running' });
  } else {
    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ]
    });
  //   client.on("ready", () => {
  //     console.log(`Logged in as ${client.user.tag}!`)
  // })

  client.on("messageCreate", (msg) => {
    helpCommand(msg);  
  })

    client.login(process.env.DISCORD_BOT_TOKEN);

    botIsRunning = true;
    console.log('Bot started');
    res.status(200).json({ message: 'Bot started' });
  }
});

app.post('/stop', (req, res) => {
  if (botIsRunning) {
    if (client) {
      client.destroy();
      client = null;
      botIsRunning = false;
      console.log('Bot stopped');
    }
    res.status(200).json({ message: 'Bot stopped' });
  } else {
    res.status(200).json({ message: 'Bot is not running' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
