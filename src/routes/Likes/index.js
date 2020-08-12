// Dependencies
const { Router } = require("express");

// Router
const LikesRouter = Router();

LikesRouter.post("/repositories/:id/like", (request, response) => {
  response.json({});
});

module.exports = LikesRouter;
