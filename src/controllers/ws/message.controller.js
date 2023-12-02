const Service = require("../../api/services/index.service");
const Repository = require("../../models/repositories/index.repository");

class MessageController {
  constructor() {
    this.service = { 
      message: new Service().message
    };
    this.repo = { 
      user: new Repository().user
    };
  }

  async init(io, session) {
    io.use((socket, next) => session(socket.request, socket.request.res, next));
    io.sockets.on("connection", async socket => {
      const { passport } = socket.request.session;
      const user = passport ? await this.repo.user.get({ id: passport?.user }) : {};
      socket.emit("server:idUser", user._id);
      socket.emit("server:all-messages", await this.service.message.getAll(user._id, "account"));
      let listenToUserResponses;
      socket.on("client:request-help", async () => {
        const initHelp = `¡Hola ${user.firstname}!, ¿En que te puedo ayudar?`
        socket.emit("server:offer-help", await this.service.message.saveMessageAdmin(user._id, initHelp));
        const optionsHelp = `Por favor, elige una de las siguientes opciones: a) No encuentro mi carrito b) Quiero hablar con un asesor. c) No necesito ayuda, gracias.`;
        socket.emit("server:offer-help", await this.service.message.saveMessageAdmin(user._id, optionsHelp));
        listenToUserResponses = true;
      });
      socket.on("client:new-message", async message => {
        socket.emit("server:render-message", await this.service.message.saveMessageUser(user, message));
        if(listenToUserResponses) {
          const { response, listen } = await this.service.message.evaluateResponse(user._id, message);
          socket.emit("server:render-message", await response);
          listenToUserResponses = listen;
        }
      });
      io.sockets.emit("chat:render-all-messages", await this.service.message.getAll(user._id, "all"));
      socket.on("user:new-message", async message => {
        io.sockets.emit("chat:render-new-message", await this.service.message.saveMessageUser(user, message));
      })
    })
  };
}
module.exports = new MessageController();