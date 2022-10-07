require("dotenv").config();
const { connectMongo } = require("./Structures/mongoDB");
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadCollections } = require("./Structures/Functions/collectionLoader");
loadCollections(client);

connectMongo(process.env.databaseURL);

const { loadHandlers } = require("./Handlers");
loadHandlers(client);

client.login(process.env.bot_token);
