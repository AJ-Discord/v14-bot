const { Collection } = require("discord.js");
const emoji = require("../emojis.json");

async function loadCollections(client) {
  client.events = new Collection();
  client.commands = new Collection();
  client.devCommands = new Collection();
  client.subCommands = new Collection();
  client.developers = process.env.developer_ids;
  client.buttons = new Collection();
  client.selectMenus = new Collection();
  client.modals = new Collection();
  client.emotes = emoji;
}

module.exports = { loadCollections };
