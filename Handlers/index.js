const { loadEvents } = require("./eventHandler");
const { loadCommands } = require("./commandHandler");
const { loadButtons } = require("./buttonHandler");
const { loadSelectMenus } = require("./selectMenuHandler");

async function loadHandlers(client) {
  loadEvents(client);
  loadCommands(client);
  loadButtons(client);
  loadSelectMenus(client);
}

module.exports = {
  loadHandlers,
  loadEvents,
  loadCommands,
  loadButtons,
  loadSelectMenus,
};
