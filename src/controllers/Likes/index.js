// Database
const repositories = require("../../database");

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

      return response.json(newRepository);
    }

    return response.status(400).json({
      errorMessage: "Oops... something went wrong",
    });
  }
}

module.exports = new LikesController();
