function getSuccessResponse(data) {
  return {
    success: true,
    data,
    error: null,
  };
}

const genericErrorMessage = "Oops... something went wrong. Try again later!";

function getErrorResponse(
  errorMessage = genericErrorMessage,
  statusCode = 400
) {
  return {
    success: false,
    data: null,
    error: {
      code: statusCode,
      message: errorMessage,
    },
  };
}

module.exports = {
  getSuccessResponse,
  getErrorResponse,
};
