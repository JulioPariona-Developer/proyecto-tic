const Controller = require('../../../controllers/index.controller');
const { Router } = require('express');
const auth = require('../../../middlewares/auth.middleware');

const controller = new Controller().views;
const webSiteRoutes = Router();

//Routes
  // SESSIONS
  webSiteRoutes.get('/', controller.renderSessions);
  webSiteRoutes.get('/login-error', controller.renderError);
  webSiteRoutes.get('/logout', auth, controller.renderLogout);
  // // USER
  // webSiteRoutes.get('/profile', auth, controller.renderProfile);
  // // MESSAGES
  // webSiteRoutes.use('/chat/:email', auth, controller.renderChat);
  // webSiteRoutes.use('/chat', auth, controller.renderChat);
  // INFO
  // webSiteRoutes.use('/info', auth, controller.renderInfo);

module.exports = webSiteRoutes;
