// Dependencies
const { uuid } = require("uuidv4");

// Database
const repositories = require("../../database");

class RepositoriesController {
  getAll(request, response) {
    return response.json({
      success: true,
      data: repositories,
      error: null,
    });
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

      return response.json({
        repositories,
      });
    }

    return response.status(400).send({
      success: false,
      data: null,
      error: {
        code: 400,
        message: "Oops... something went wrong! Try again later.",
      },
    });
  }
}

module.exports = new RepositoriesController();
