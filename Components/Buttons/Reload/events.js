const { ButtonInteraction, Client } = require("discord.js");
const { loadEvents } = require("../../../Structures/Handlers");

module.exports = {
  id: "reload.events",
  developer: true,
  permission: "ADMINISTRATOR",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    for (const [key, value] of client.events)
      client.removeListener(`${key}`, value, true);
    loadEvents(client);
    interaction.reply({ content: "Reloaded events", ephemeral: true });
  },
};
