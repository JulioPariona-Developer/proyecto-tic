const apiResponse = (response, statusCode) => ({
  error: +statusCode >= 400 ? true : false,
  statusCode,
  response,
});

module.exports = { apiResponse }