const { loadCommands } = require("../../Handlers");

module.exports = {
  name: "ready",
  once: "true",
  execute(client) {
    console.log(`logged in as ${client.user.username}`);
    client.user.setActivity(
      `with ${client.guilds.cache.size} ${
        client.guilds.cache.size > 1 ? "guilds" : "guild"
      }`
    );

    loadCommands(client);
  },
};
