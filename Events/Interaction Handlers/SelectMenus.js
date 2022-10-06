const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (!interaction.isSelectMenu()) return;

    const Menu = client.selectMenus.get(interaction.customId);
    if (!Menu)
      return interaction.reply({
        content: "🔴 This Menu is outdated",
        ephemeral: true,
      });

    if (Menu.permission && !interaction.member.permissions.has(Menu.permission))
      return interaction.reply({
        content: "🔴 You are missing the permissions required for this menu",
        ephemeral: true,
      });

    if (Menu.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
      return interaction.reply({
        content: "🔴 You are not the owner of this server to use this menu",
        ephemeral: true,
      });

    if (Menu.developer && !client.developers.includes(interaction.user.id))
      return interaction.reply({
        content: "🔴 This menu is only available to the developers of the bot",
        ephemeral: true,
      });

    Menu.execute(interaction, client);
  },
};
