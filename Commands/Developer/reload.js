const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reload different files of the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const commandBtn = new ButtonBuilder()
      .setCustomId("reload.commands")
      .setLabel("Reload Commands")
      .setStyle(ButtonStyle.Primary);

    const eventBtn = new ButtonBuilder()
      .setCustomId("reload.events")
      .setLabel("Reload Events")
      .setStyle(ButtonStyle.Primary);

    const buttonBtn = new ButtonBuilder()
      .setCustomId("reload.buttons")
      .setLabel("Reload Buttons")
      .setStyle(ButtonStyle.Primary);

    const selectMenuBtn = new ButtonBuilder()
      .setCustomId("reload.menus")
      .setLabel("Reload Select Menus")
      .setStyle(ButtonStyle.Primary);

    const modalBtn = new ButtonBuilder()
      .setCustomId("reload.modals")
      .setLabel("Reload Modals")
      .setStyle(ButtonStyle.Primary);

    const allBtn = new ButtonBuilder()
      .setCustomId("reload.all")
      .setLabel("Reload Everything")
      .setStyle(ButtonStyle.Primary);

    const Buttons1 = new ActionRowBuilder().addComponents(
      commandBtn,
      eventBtn,
      buttonBtn
    );

    const Buttons2 = new ActionRowBuilder().addComponents(
      selectMenuBtn,
      modalBtn,
      allBtn
    );

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("Reload different Files")
      .setDescription(
        "Click on any of the following buttons to reload that particular folder of the part specifically."
      );

    await interaction.reply({
      embeds: [embed],
      components: [Buttons1, Buttons2],
      ephemeral: true,
    });
  },
};
