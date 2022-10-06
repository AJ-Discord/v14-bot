const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

async function loadSelectMenus(client) {
  console.log(
    chalk.blue("Attempting to Load Select Menus ............................\n")
  );
  const table = new ascii().setHeading("Select Menus", "Status");

  await client.selectMenus.clear();

  const Files = await loadFiles("Components/SelectMenus");

  if (Files.length === 0)
    return console.log(
      chalk.red("Failed to Load Select Menus(No menus found)\n")
    );

  Files.forEach(async (file) => {
    const menu = require(file);

    if (!menu.id) {
      const L = file.split("/");
      return table.addRow(
        chalk.red(L[L.length - 1]),
        chalk.red("🛑 Missing a id")
      );
    }

    client.selectMenus.set(menu.id, menu);
    return table.addRow(menu.id, "🟢 Active");
  });

  console.log(
    table.toString(),
    chalk.green("\n\nLoaded Select Menus Successfully ✔✔\n")
  );
}

module.exports = { loadSelectMenus };
