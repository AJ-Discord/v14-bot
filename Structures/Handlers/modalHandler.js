const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

async function loadModals(client) {
  console.log(
    chalk.blue("Attempting to Load Modals ............................\n")
  );
  const table = new ascii().setHeading("Modals", "Status");

  await client.modals.clear();

  const Files = await loadFiles("Components/Modals");

  if (Files.length === 0)
    return console.log(chalk.red("Failed to Load Modals(No modals found)\n"));

  Files.forEach(async (file) => {
    const modal = require(file);

    if (!modal.id) {
      const L = file.split("/");
      return table.addRow(
        chalk.red(L[L.length - 1]),
        chalk.red("🛑 Missing a id")
      );
    }

    client.modals.set(modal.id, modal);
    return table.addRow(modal.id, "🟢 Active");
  });

  console.log(
    table.toString(),
    chalk.green("\n\nLoaded Modals Successfully ✔✔\n")
  );
}

module.exports = { loadModals };
