require("dotenv").config();
const { connectMongo } = require("./Structures/mongoDB");
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

connectMongo(process.env.databaseURL);

const { loadFunctions } = require("./Structures/Functions");
loadFunctions(client);

client.login(process.env.bot_token);
