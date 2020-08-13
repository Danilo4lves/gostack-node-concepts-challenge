// Database
const repositories = require("../../database");

// Infra
const { getSuccessResponse, getErrorResponse } = require("../../infra");

class LikesController {
  increase(request, response) {
    const { params = {} } = request;
    const { id } = params;

    const repositoryToBeFoundIndex = repositories.findIndex((repository) => {
      return repository.id === id;
    });

    if (repositoryToBeFoundIndex >= 0) {
      const repository = repositories[repositoryToBeFoundIndex];
      const { likes = 0 } = repository;

      const newRepository = {
        ...repository,
        likes: likes + 1,
      };

      repositories.splice(repositoryToBeFoundIndex, 1, newRepository);

      const successResponse = getSuccessResponse(newRepository);

      return response.json(successResponse);
    }

    const errorResponse = getErrorResponse();

    return response.status(400).json(errorResponse);
  }
}

module.exports = new LikesController();
