const env = require("../../utils/config/env.config");
const STATUS = require("../../utils/constants/status.constants");
const { apiResponse } = require("../../utils/response.utils");

const isAdmin = (req, res, next) => {
  const { code: status } = STATUS.ACCESS_PROHIBITED;
  if(req.user.email == env.ADMIN_EMAIL) return next();
  const message = `You do not have the necessary permissions to access this page`;
  res.status(status).json(apiResponse(message, status));
};

module.exports = isAdmin;