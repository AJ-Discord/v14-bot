const { loadEvents } = require("./eventHandler");
const { loadCommands } = require("./commandHandler");
const { loadButtons } = require("./buttonHandler");
const { loadSelectMenus } = require("./selectMenuHandler");
const { loadModals } = require("./modalHandler");

async function loadHandlers(client) {
  loadEvents(client);
  loadCommands(client);
  loadButtons(client);
  loadSelectMenus(client);
  loadModals(client);
}

module.exports = {
  loadHandlers,
  loadEvents,
  loadCommands,
  loadButtons,
  loadSelectMenus,
  loadModals,
};
