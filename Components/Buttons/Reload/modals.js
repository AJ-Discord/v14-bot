const { ButtonInteraction, Client } = require("discord.js");
const { loadModals } = require("../../../Structures/Handlers");

module.exports = {
  id: "reload.modals",
  developer: true,
  permission: "ADMINISTRATOR",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    loadModals(client);
    interaction.reply({ content: "Reloaded modals", ephemeral: true });
  },
};
