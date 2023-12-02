const { apiResponse } = require("../../utils/response.utils");

const errorMiddleware = (error, req, res, next) => {
  const { status, message, details } = error;
  const errorBack = {
    status: 500,
    message: "sorry, i couldn't avoid this error :c",
    details: message
  }
  return res.status(+status || +errorBack.status).json(status ? apiResponse({ message, details }, +status) : errorBack);
};

module.exports = errorMiddleware;