const mongoose = require("mongoose");
const chalk = require("chalk");

async function connectMongo(URL) {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(chalk.cyan("Mongo Database • Connected"));
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
}

module.exports = { connectMongo };
