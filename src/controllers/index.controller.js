class Controller {
  get views() {
    return ({
      // ...require("./views/chat.controller"),
      // ...require("./views/server.controller"),
      ...require("./views/session.controller"),
      // ...require("./views/store.controller")
    })
  }

  get ws() {
    return ({
      // message: require("./ws/message.controller")
    })
  }
}

module.exports = Controller;