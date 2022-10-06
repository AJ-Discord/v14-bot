const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (!interaction.isButton()) return;

    const Button = client.buttons.get(interaction.customId);
    if (!Button)
      return interaction.reply({
        content: "🔴 This button is outdated",
        ephemeral: true,
      });

    if (
      Button.permission &&
      !interaction.member.permissions.has(Button.permission)
    )
      return interaction.reply({
        content: "🔴 You are missing the permissions required for this button",
        ephemeral: true,
      });

    if (Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
      return interaction.reply({
        content: "🔴 You are not the owner of this server to use this button",
        ephemeral: true,
      });

    if (Button.developer && !client.developers.includes(interaction.user.id))
      return interaction.reply({
        content:
          "🔴 This button is only available to the developers of the bot",
        ephemeral: true,
      });

    Button.execute(interaction, client);
  },
};
