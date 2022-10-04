const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

async function loadCommands(client) {
  console.log(
    chalk.blue("Attempting to Load Commands .............. ..............")
  );
  const table = new ascii().setHeading("Commands", "Status");

  await client.commands.clear();

  let commandsArray = [];

  const Files = await loadFiles("Commands");
  Files.forEach(async (file) => {
    const command = require(file);
    if (!command.data) return;

    client.commands.set(command.data.name, command);

    commandsArray.push(command.data.toJSON());

    table.addRow(command.data.name, "🟢 Active");
  });

  client.application.commands.set(commandsArray);

  return console.log(
    table.toString(),
    chalk.green("\n\nLoaded Commands Successfully ✔✔")
  );
}

module.exports = { loadCommands };
