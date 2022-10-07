const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

const devGuildID = process.env.devGuildID;

async function loadCommands(client) {
  console.log(
    chalk.blue("Attempting to Load Commands ............................\n")
  );
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();
  await client.subCommands.clear();

  let PublicGuildCommandsArray = [];
  let DevGuildCommandsArray = [];

  const Files = await loadFiles("Commands");

  if (Files.length === 0)
    return console.log(
      chalk.red("Failed to Load Commands(No commands found)\n")
    );

  Files.forEach(async (file) => {
    const command = require(file);

    if (command.subCommand)
      return client.subCommands.set(command.subCommand, command);

    if (!command.data) return;

    if (command.developer) {
      client.devCommands.set(command.data.name, command);
      DevGuildCommandsArray.push(command.data.toJSON());
    } else {
      client.commands.set(command.data.name, command);
      PublicGuildCommandsArray.push(command.data.toJSON());
    }

    table.addRow(command.data.name, "🟢 Active");
  });

  console.log(
    table.toString(),
    chalk.green("\n\nLoaded Commands Successfully ✔✔\n")
  );

  client.on("ready", async () => {
    client.application.commands.set(PublicGuildCommandsArray);
    client.guilds.cache.forEach((g) => {
      if (g.id == devGuildID) {
        g.commands.set(DevGuildCommandsArray);
        setTimeout(() => {
          console.log(
            chalk.cyan(
              `\nLoaded ${DevGuildCommandsArray.length} ${
                DevGuildCommandsArray.length > 1 ? "commands" : "command"
              } for the Developer server`
            )
          );
        }, 5 * 1000);
      }
    });
  });
}

module.exports = { loadCommands };
