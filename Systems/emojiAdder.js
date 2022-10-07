const fs = require("fs");

module.exports = async (client) => {
  client.on("ready", () => {
    listEmoji(client);
    setInterval(function () {
      listEmoji(client);
    }, 10 * 1000);
  });

  function listEmoji(client) {
    setTimeout(() => {
      const guild = client.guilds.cache.get(process.env.devGuildID);
      const emojiList = `{ \n${guild.emojis.cache
        .map((e, x) => `"${e.name}" : "${e.toString()}"`)
        .join(",\n")} \n}`;

      fs.writeFile("./Structures/emojis.json", emojiList, (err) => {
        if (err) throw err;

        console.log("New data added");
      });
    }, 10 * 1000);
  }
};
