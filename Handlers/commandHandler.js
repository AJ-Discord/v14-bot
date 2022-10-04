const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

const devGuildID = process.env.devGuildID;

async function loadCommands(client) {
  console.log(
    chalk.blue("Attempting to Load Commands .............. ..............")
  );
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  let PublicGuildCommandsArray = [];
  let DevGuildCommandsArray = [];

  const Files = await loadFiles("Commands");
  Files.forEach(async (file) => {
    const command = require(file);
    if (!command.data) {
      const L = file.split("/");
      return table.addRow(
        chalk.red(L[L.length - 1]),
        chalk.red("🛑 Missing the data")
      );
    }

    if (!command.data.name) {
      const L = file.split("/");
      return table.addRow(
        chalk.red(L[L.length - 1]),
        chalk.red("🛑 Missing a name")
      );
    }

    if (!command.data.description) {
      return table.addRow(
        chalk.red(command.name),
        chalk.red("🛑 Missing a description")
      );
    }

    if (command.developer) {
      client.devCommands.set(command.data.name, command);
      DevGuildCommandsArray.push(command.data.toJSON());
    } else {
      client.commands.set(command.data.name, command);
      PublicGuildCommandsArray.push(command.data.toJSON());
    }

    table.addRow(command.data.name, "🟢 Active");
  });

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

  return console.log(
    table.toString(),
    chalk.green("\n\nLoaded Commands Successfully ✔✔")
  );
}

module.exports = { loadCommands };
