const { ButtonInteraction, Client } = require("discord.js");
const { loadSelectMenus } = require("../../../Structures/Handlers");

module.exports = {
  id: "reload.menus",
  developer: true,
  permission: "ADMINISTRATOR",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    loadSelectMenus(client);
    interaction.reply({ content: "Reloaded Select Menus", ephemeral: true });
  },
};
