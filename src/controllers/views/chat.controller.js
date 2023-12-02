const Service = require("../../api/services/index.service");
const Repository = require("../../models/repositories/index.repository");
const { template } = require("../../utils/template.utils");

const repo = new Repository();
const service = new Service();

const renderChat = async (req, res, next) => {
  template.set("hbs");
  const { email } = req.params;
  try {
    if(email) {
      await service.message.validateEmail(email, req.user.email);
      const messages = await repo.message.get({ author: req.user._id, all: true });
      return res.render("hbs/layouts/main", template.render("Mi Chat", { renderChat: { emailUser: false, messages } }));
    }
    res.render("hbs/layouts/main", template.render("Chat", { renderChat: { emailUser: req.user.email, messages: false } }));
  } catch (error) { next(error); }
}


module.exports = { renderChat };