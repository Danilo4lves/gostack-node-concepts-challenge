// Dependencies
const { Router } = require("express");

// Router
const LikesRouter = Router();

// Controllers
const { LikesController } = require("../../controllers");

LikesRouter.post("/repositories/:id/like", LikesController.increase);

module.exports = LikesRouter;
