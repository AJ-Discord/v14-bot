const { ButtonInteraction, Client } = require("discord.js");
const { loadHandlers } = require("../../../Structures/Handlers");

module.exports = {
  id: "reload.all",
  developer: true,
  permission: "ADMINISTRATOR",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    loadHandlers(client);
    interaction.reply({ content: "Everything has been reloaded", ephemeral: true });
  },
};
