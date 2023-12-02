const env = require("../../utils/config/env.config");
const { mongodb } = require("../../utils/config/db.config");
const { template } = require("../../utils/template.utils");
const { cpus } = require("os");
const args = require("../../utils/args.utils");

const renderConfig = async (req, res, next) => {
  template.set("hbs");
  try {
    const responseEnv = {
      ...env,
      uriDbCoockie: mongodb.simulateConnection("sessions"),
      uriDbData: mongodb.simulateConnection(),
      dbIsCloud: env.DB_PERSISTENCE_TYPE == "cloud"
    }
    res.render("hbs/layouts/main", template.render("Configuración del servidor", { renderServerConfig: responseEnv }));
  } catch (error) { next(error); }
}

const renderInfo = async (req, res, next) => {
  template.set("pug");
  try {
    res.render("pug/index", template.render("Información del servidor", { renderServerInfo: { 
      inputArguments: JSON.stringify(args), 
      platformName: process.platform, 
      versionNode: process.version, 
      rss: process.memoryUsage().rss, 
      path: `"${process.argv[0]}"`,
      processId: process.pid, 
      projectFolder: `"${process.cwd()}"`,
      numOfProcessors: cpus().length
    } }));
  } catch (error) { next(error); }
}

module.exports = { renderConfig, renderInfo };