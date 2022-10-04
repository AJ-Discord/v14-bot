const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("wil respond with pong"),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    return interaction.reply({ content: "pong", ephemeral: true });
  },
};
