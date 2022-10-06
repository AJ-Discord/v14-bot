const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

async function loadEvents(client) {
  console.log(
    chalk.blue("Attempting to Load Events ............................\n")
  );
  const table = new ascii().setHeading("Events", "Status");

  await client.events.clear();

  const Files = await loadFiles("Events");

  if (Files.length === 0)
    return console.log(chalk.red("Failed to Load Events(No events found)\n"));

  Files.forEach(async (file) => {
    const event = require(file);

    if (!event.name) {
      const L = file.split("/");
      await table.addRow(
        chalk.red(`${event.name || "MISSING"}`),
        chalk.red(
          `⛔ Event name is missing: ${L[L.length - 2] + `/` + L[L.length - 1]}`
        )
      );
      return;
    }

    const execute = (...args) => event.execute(...args, client);
    client.events.set(event.name, execute);

    if (event.rest) {
      if (event.once) client.rest.once(client.name, execute);
      else client.rest.on(client.name, execute);
    } else {
      if (event.once) client.once(event.name, execute);
      else client.on(event.name, execute);
    }

    table.addRow(event.name, "🟢 Active");
  });

  console.log(
    table.toString(),
    chalk.green("\n\nLoaded Events Successfully ✔✔\n")
  );
}

module.exports = { loadEvents };
