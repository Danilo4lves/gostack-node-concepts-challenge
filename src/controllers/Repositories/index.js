// Dependencies
const { uuid } = require("uuidv4");

// Database
const repositories = require("../../database");

// Infra
const { getSuccessResponse, getErrorResponse } = require("../../infra");

class RepositoriesController {
  getAll(request, response) {
    const successResponse = getSuccessResponse(repositories);

    return response.json(successResponse);
  }

  create(request, response) {
    const { body = {} } = request;
    const { title, url, techs } = body;

    const hasAllRequestData = title && url && techs;

    if (hasAllRequestData) {
      const id = uuid();

      const newRepository = {
        id,
        title,
        url,
        techs,
        likes: 0,
      };

      repositories.push(newRepository);

      const successResponse = getSuccessResponse(repositories);

      return response.json(successResponse);
    }

    const errorResponse = getErrorResponse();

    return response.status(400).send(errorResponse);
  }

  update(request, response) {
    const { params = {}, body = {} } = request;
    const { id } = params;
    const { title, url, techs } = body;

    const hasAllRequestData = title && url && techs;

    if (hasAllRequestData) {
      const repositoryToBeFoundIndex = repositories.findIndex((repository) => {
        return id === repository.id;
      });

      if (repositoryToBeFoundIndex >= 0) {
        const { likes = 0 } = repositories[repositoryToBeFoundIndex];

        const newRepository = {
          id,
          title,
          url,
          techs,
          likes,
        };

        repositories[repositoryToBeFoundIndex] = newRepository;

        const successResponse = getSuccessResponse(repositories);

        return response.json(successResponse);
      }

      const notFoundErrorResponse = getErrorResponse(
        "Repository could not be found.",
        404
      );

      return response.status(404).json(notFoundErrorResponse);
    }

    const errorResponse = getErrorResponse();

    return response.status(400).json(errorResponse);
  }

  delete(request, response) {
    const { params = {} } = request;
    const { id } = params;

    const repositoryTobeFoundIndex = repositories.findIndex((repository) => {
      return repository.id === id;
    });

    if (repositoryTobeFoundIndex >= 0) {
      repositories.splice(repositoryTobeFoundIndex, 1);

      const successResponse = getSuccessResponse(repositories);

      return response.json(successResponse);
    }

    const errorResponse = getErrorResponse();

    return response.status(400).json(errorResponse);
  }
}

module.exports = new RepositoriesController();
