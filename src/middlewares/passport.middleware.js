const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const Controller = require("../../controllers/index.controller");
const daosFactory = require("../../models/daos/daos.factory");

const { authenticate: { local } } = new Controller();
const userDao = daosFactory().user;


// Passport Local Strategy
passport.use("login", new LocalStrategy(local.login));
passport.use("signup", new LocalStrategy({ passReqToCallback: true }, local.signup));

// Serializacion:
passport.serializeUser(({ _id }, done) => {
  console.log("Inside serializer");
  done(null, _id);
});

// Deserializacion:
passport.deserializeUser(async (_id, done) => {
  console.log("Inside deserializer");
  done(null, await userDao.getById(_id));
});

module.exports = passport;