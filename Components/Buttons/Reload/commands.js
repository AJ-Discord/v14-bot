const { ButtonInteraction, Client } = require("discord.js");
const { loadCommands } = require("../../../Handlers");

module.exports = {
  id: "reload.commands",
  developer: true,
  permission: "ADMINISTRATOR",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    loadCommands(client);
    interaction.reply({ content: "Reloaded commands", ephemeral: true });
  },
};
