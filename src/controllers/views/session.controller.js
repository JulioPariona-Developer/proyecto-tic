const path = require("path");
const env = require("../../../utils/config/env.config");
// const { template } = require("../../utils/template.utils");

const renderSessions = (req, res, next) => {
  try {
    const user = req.user;
    if(user) return res.redirect('/vote');
    const indexHtml = path.resolve(process.cwd(), "./public/sessions.html");
    res.status(200).sendFile(indexHtml);
  } catch (error) { next(error); }
}

const renderLogout = async (req, res, next) => {
  // template.set("ejs");
  const user = req.user.email;
  req.logout();
  req.session.destroy(err => {
    if(err) res.clearCookie(env.SESSION_NAME);
    // res.render("ejs/index", template.render("Cerrando sesión", { renderLogout: { user } }));
  });
  res.clearCookie(env.SESSION_NAME);
}

const renderError = async (req, res, next) => {
  // template.set("ejs");
  const page = `${req.url.split("error")[0]}error` == "/signup-error" ? "SIGNUP" : "LOGIN";
  const message = `USER ERROR ${page}`;
  // res.render("ejs/index", template.render(message, { renderError: { message } }));
}

module.exports = { renderSessions, renderLogout, renderError };