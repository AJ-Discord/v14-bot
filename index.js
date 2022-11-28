require("dotenv").config();
const { connectMongo } = require("./Structures/mongoDB");
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: Object.keys(GatewayIntentBits),
  partials: Object.keys(Partials),
});

connectMongo(process.env.databaseURL);

const { loadFunctions } = require("./Structures/Functions");
loadFunctions(client);

client.login(process.env.bot_token);
