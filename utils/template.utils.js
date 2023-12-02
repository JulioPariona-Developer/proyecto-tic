class InitTemplate {
  static #app;
  constructor(app) {
    if(!InitTemplate.#app) {
      if(app) InitTemplate.#app = app;
    } else return InitTemplate.#app;
  }
  set(template) { 
    return InitTemplate.#app.set(`view engine`, template);
  }
  render(title, { 
    renderProducts, 
    renderProduct, 
    renderCart, 
    renderProfile, 
    renderProfilePicture, 
    renderLogout,
    renderChat,
    renderServerConfig,
    renderServerInfo,
    renderError
  }) {
    return ({
      title,
      styles: `../styles/css/app.css`,
      script: "../scripts/message.js",
      socket: !renderChat ? "scripts/socket-bot.js" : "../scripts/socket-chat.js",
      actual: {
        products: renderProducts ? "actual" : "",
        cart: renderCart ? "actual" : "",
        profile: renderProfile ? "actual" : "",
        chat: renderChat ? "actual" : ""
      },
      page: {
        products: renderProducts ? "/" : "/products",
        cart: renderCart ? "/" : "/cart",
        profile: renderProfile ? "/" : "/profile",
        chat: renderChat ? "/" : "/chat"
      },
      renderProducts: renderProducts ? renderProducts : false,
      renderProduct: renderProduct ? renderProduct : false,
      renderCart: renderCart ? renderCart : false,
      renderProfile: renderProfile ? renderProfile : false,
      renderLogout: renderLogout ? renderLogout : false,
      renderProfile: renderProfile ? renderProfile : false,
      renderProfilePicture: renderProfilePicture ? renderProfilePicture : false,
      renderChat: renderChat ? renderChat : false,
      renderServerConfig: renderServerConfig ? renderServerConfig : false,
      renderServerInfo: renderServerInfo ? renderServerInfo : false,
      renderError: renderError ? renderError : false
    })
  }
}

module.exports = { InitTemplate, template: new InitTemplate() }