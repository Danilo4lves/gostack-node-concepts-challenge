// Dependencies
const { uuid } = require("uuidv4");

// Database
const repositories = require("../../database");

class RepositoriesController {
  getAll(request, response) {
    return response.json(repositories);
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

      return response.json(newRepository);
    }

    return response.status(400).send({
      errorMessage: "Oops... something went wrong!",
    });
  }

  update(request, response) {
    const { params = {}, body = {} } = request;
    const { id } = params;
    const { title, url, techs } = body;

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

      return response.json(newRepository);
    }

    return response.status(400).send({
      errorMessage: "Oops... something went wrong!",
    });
  }

  delete(request, response) {
    const { params = {} } = request;
    const { id } = params;

    const repositoryTobeFoundIndex = repositories.findIndex((repository) => {
      return repository.id === id;
    });

    if (repositoryTobeFoundIndex >= 0) {
      repositories.splice(repositoryTobeFoundIndex, 1);

      return response.status(204).json({});
    }

    return response.status(400).send({
      errorMessage: "Oops... something went wrong!",
    });
  }
}

module.exports = new RepositoriesController();
