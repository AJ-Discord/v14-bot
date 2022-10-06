const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: "true",
  execute(client) {
    console.log(`logged in as ${client.user.username}`);

    client.user.setPresence({
      activities: [
        {
          name: ` over ${client.guilds.cache.size} ${
            client.guilds.cache.size > 1 ? "servers" : "server"
          }`,
          type: ActivityType.Watching,
        },
      ],
      status: "online",
    });
  },
};
