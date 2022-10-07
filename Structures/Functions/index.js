const { loadCollections } = require("./collectionLoader");
const { loadHandlers } = require("../Handlers");
const { loadSystems } = require("./systemLoader");

async function loadFunctions(client) {
  loadCollections(client);
  loadHandlers(client);
  loadSystems(client);
}

module.exports = { loadFunctions };
