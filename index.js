require("dotenv").config();
const { connectMongo } = require("./mongoDB");
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.events = new Collection();
client.commands = new Collection();
client.devCommands = new Collection();
client.subCommands = new Collection();
client.developers = process.env.developer_ids;
client.buttons = new Collection();
client.selectMenus = new Collection();

connectMongo(process.env.databaseURL);

const { loadHandlers } = require("./Handlers");
loadHandlers(client);

client.login(process.env.bot_token);
