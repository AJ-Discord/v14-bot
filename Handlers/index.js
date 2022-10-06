const { loadEvents } = require("./eventHandler");
const { loadCommands } = require("./commandHandler");
const { loadButtons } = require("./buttonHandler");

async function loadHandlers(client) {
  loadEvents(client);
  loadCommands(client);
  loadButtons(client);
}

module.exports = { loadHandlers, loadEvents, loadCommands, loadButtons };
