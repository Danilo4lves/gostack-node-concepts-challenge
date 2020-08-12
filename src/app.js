// Dependencies
const express = require("express");
const cors = require("cors");

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
  }

  routes() {
    routers.map((router) => {
      this.server.use(router);
    });
  }
}

module.exports = new App().server;
