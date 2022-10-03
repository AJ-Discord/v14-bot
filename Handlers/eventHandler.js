const { loadFiles } = require("../Functions/fileLoader");
const chalk = require("chalk");
const ascii = require("ascii-table");

async function loadEvents(client) {
  console.log(chalk.blue("Loading Events.............."));
  const table = new ascii().setHeading("Events", "Status");

  await client.events.clear();

  const Files = await loadFiles("Events");
  Files.forEach((file) => {
    const event = require(file);

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

  console.log(table.toString(), chalk.green("\nLoaded Events ✔✔"));
}

module.exports = { loadEvents };
