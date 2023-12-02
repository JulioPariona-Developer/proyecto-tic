const { Router } = require('express');
const passport = require("../../../api/middlewares/passport.middleware");

const authRoutes = Router();

//Routes
  authRoutes.post('/login', passport.authenticate("login", { 
    failureRedirect: "/login-error",
    successRedirect: "/products"
  }));
  authRoutes.post('/signup', passport.authenticate("signup", { 
    failureRedirect: "/signup-error",
    successRedirect: "/products"
  }));

module.exports = authRoutes;
