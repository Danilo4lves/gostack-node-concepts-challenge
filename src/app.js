// Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Routers
const routers = require("./routes");

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(morgan("common"));
  }

  routes() {
    routers.map((router) => {
      this.server.use(router);
    });
  }
}

module.exports = new App().server;
