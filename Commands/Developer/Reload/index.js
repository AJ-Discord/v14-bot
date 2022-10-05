const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload the commands/events of the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options
        .setName("events")
        .setDescription("Reload all the events of the bot")
    )
    .addSubcommand((options) =>
      options
        .setName("commands")
        .setDescription("Reload all the commands of the bot")
    ),
};
