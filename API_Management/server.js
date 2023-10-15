const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client, Intents, IntentsBitField } = require('discord.js');

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

const client = new Client({ 
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] 
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
