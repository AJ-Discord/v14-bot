const { ButtonInteraction, Client } = require("discord.js");
const { loadButtons } = require("../../../Structures/Handlers");

module.exports = {
  id: "reload.buttons",
  developer: true,
  permission: "ADMINISTRATOR",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    interaction.reply({ content: "Reloaded buttons", ephemeral: true });
    loadButtons(client);
  },
};
