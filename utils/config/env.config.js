require('dotenv').config();

const {
  DB_DEPLOY,
  DB_NAME,
  DB_MAIL,
  DB_PASS,
  PORT,
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_TIMEOUT
} = process.env;

const testData = [
  { key: "DB_DEPLOY", value: DB_DEPLOY },
  { key: "DB_NAME", value: DB_NAME },
  { key: "DB_MAIL", value: DB_MAIL },
  { key: "DB_PASS", value: DB_PASS },
  { key: "SESSION_NAME", value: SESSION_NAME },
  { key: "SESSION_SECRET", value: SESSION_SECRET },
  { key: "SESSION_TIMEOUT", value: SESSION_TIMEOUT }
];
testData.forEach(e => {
  if(!e.value) throw new Error(`[${e.key}] has not been assigned.`);
});


module.exports = {
  DB_DEPLOY,
  DB_NAME,
  DB_MAIL,
  DB_PASS,
  PORT: +PORT || 3001,
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_TIMEOUT: +SESSION_TIMEOUT,
};