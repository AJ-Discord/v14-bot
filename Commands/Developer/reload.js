const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  Client,
} = require("discord.js");
const { loadCommands, loadEvents } = require("../../Handlers");

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

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({ content: "Reloaded events", ephemeral: true });
        }
        break;

      case "commands":
        {
          loadCommands(client);
          interaction.reply({ content: "Reloaded commands", ephemeral: true });
        }
        break;
    }
  },
};
