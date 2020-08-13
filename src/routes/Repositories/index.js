// Dependencies
const { Router } = require("express");

// Controllers
const { RepositoriesController } = require("../../controllers");

// Router
const RepositoriesRouter = Router();

RepositoriesRouter.get("/repositories", RepositoriesController.getAll);

RepositoriesRouter.post("/repositories", RepositoriesController.create);

RepositoriesRouter.put("/repositories/:id", RepositoriesController.update);

RepositoriesRouter.delete("/repositories/:id", RepositoriesController.delete);

module.exports = RepositoriesRouter;
