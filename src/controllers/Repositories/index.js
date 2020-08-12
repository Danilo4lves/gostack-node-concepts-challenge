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
}

module.exports = new RepositoriesController();
