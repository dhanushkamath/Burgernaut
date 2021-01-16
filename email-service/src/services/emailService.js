const nodemailer = require('nodemailer');
const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PWD = process.env.EMAIL_PWD;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PWD
  }
});

/**
 * Send Email.
 */
const sendEmail = (mailOptions, callback) => {
    return transporter.sendMail(mailOptions, callback);
}

module.exports = {
    sendEmail: sendEmail
}

