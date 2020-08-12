// Dependencies
const { Router } = require("express");

// Controllers
const RepositoriesController = require("../../controllers/Repositories");

// Router
const RepositoriesRouter = Router();

RepositoriesRouter.get("/repositories", RepositoriesController.getAll);

RepositoriesRouter.post("/repositories", RepositoriesController.create);

RepositoriesRouter.put("/repositories/:id", RepositoriesController.update);

module.exports = RepositoriesRouter;
