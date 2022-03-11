const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const initDataBase = require("./startUp/initDatabase.js");
const routes = require("./routes");

const app = express();

const PORT = config.get("port") || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

/* if (process.env.NODE_ENV === "production") {
  console.log("Production");
} else {
  console.log("Development");
} */

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDataBase();
    });
    await mongoose.connect(config.get("mongoUri"));

    app.listen(PORT, () => {
      console.log(
        chalk.green(`Server has been started on port ${chalk.blue(PORT)} ...`)
      );
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
