const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

async function loadButtons(client) {
  console.log(
    chalk.blue("Attempting to Load Buttons ............................\n")
  );
  const table = new ascii().setHeading("Buttons", "Status");

  await client.buttons.clear();

  const Files = await loadFiles("Components/Buttons");

  if (Files.length === 0)
    return console.log(chalk.red("Failed to Load Buttons(No buttons found)\n"));

  Files.forEach(async (file) => {
    const button = require(file);

    if (!button.id) {
      const L = file.split("/");
      return table.addRow(
        chalk.red(L[L.length - 1]),
        chalk.red("🛑 Missing a id")
      );
    }

    client.buttons.set(button.id, button);
    return table.addRow(button.id, "🟢 Active");
  });

  console.log(
    table.toString(),
    chalk.green("\n\nLoaded Buttons Successfully ✔✔\n")
  );
}

module.exports = { loadButtons };
