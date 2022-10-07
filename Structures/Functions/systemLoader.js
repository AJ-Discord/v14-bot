const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);
const chalk = require("chalk");

async function loadSystems(client) {
  console.log(
    chalk.blue("Attempting to Load Systems ............................\n")
  );

  const Files = await proGlob(
    `${process.cwd().replace(/\\/g, "/")}/Systems/*.js`
  );

  Files.forEach((file) => {
    delete require.cache[require.resolve(file)];

    require(file)(client);
  });

  await console.log(chalk.green("\n\nLoaded all Systems Successfully ✔✔\n"));
}

module.exports = { loadSystems };
