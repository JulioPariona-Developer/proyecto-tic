const nodemailer = require('nodemailer');
const fs = require('fs');
const env = require("./env.config");
const CustomError = require('../error.utils');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: env.ADMIN_EMAIL,
    pass: env.ADMIN_PASS
  }
});

const mailOptions = async ({ email, subject, view, id }) => {
  try {
    await transporter.sendMail({
      from: 'proyecto.final@gmail.com',
      to: email,
      subject,
      html: await fs.promises.readFile(process.cwd() + `/response/${view}/${id.toString()}.html`)
    });
  } catch (error) { throw new CustomError(STATUS.INTERNAL_ERROR, "An error occurred while trying to send an email."); }
};

module.exports = mailOptions;