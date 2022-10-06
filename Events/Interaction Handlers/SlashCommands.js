const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command =
      client.commands.get(interaction.commandName) ||
      client.devCommands.get(interaction.commandName);

    if (!command)
      return interaction.reply({
        content: "🔴 This command is outdated",
        ephemeral: true,
      });

    if (command.developer && !client.developers.includes(interaction.user.id))
      return interaction.reply({
        content:
          "🔴 This command is only available to the developers of the bot",
        ephemeral: true,
      });

    const subCommand = interaction.options.getSubcommand(false);
    if (subCommand) {
      const subCommandFile = client.subCommands.get(
        `${interaction.commandName}.${subCommand}`
      );

      if (!subCommandFile)
        return interaction.reply({
          content: "🔴 This subCommand is outdated",
          ephemeral: true,
        });

      subCommandFile.execute(interaction, client);
    } else {
      command.execute(interaction, client);
    }
  },
};
