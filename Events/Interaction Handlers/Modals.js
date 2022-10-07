const {
  ChatInputCommandInteraction,
  Client,
  InteractionType,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (interaction.type !== InteractionType.ModalSubmit) return;

    const Modal = client.modals.get(interaction.customId);
    if (!Modal)
      return interaction.reply({
        content: "🔴 This modal is outdated",
        ephemeral: true,
      });

    if (
      Modal.permission &&
      !interaction.member.permissions.has(Modal.permission)
    )
      return interaction.reply({
        content: "🔴 You are missing the permissions required for this modal",
        ephemeral: true,
      });

    if (Modal.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
      return interaction.reply({
        content: "🔴 You are not the owner of this server to use this modal",
        ephemeral: true,
      });

    if (Modal.developer && !client.developers.includes(interaction.user.id))
      return interaction.reply({
        content: "🔴 This modal is only available to the developers of the bot",
        ephemeral: true,
      });

    Modal.execute(interaction, client);
  },
};
