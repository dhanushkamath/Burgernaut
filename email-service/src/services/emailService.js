var nodemailer = require('nodemailer');
const { EMAIL_ID, EMAIL_PWD} = require('../resources/emailCredentials');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PWD
  }
});

/**
 * Connect to RabbitMQ and consumer orders
 */
const sendEmail = (mailOptions, callback) => {
    return transporter.sendMail(mailOptions, callback);
}

module.exports = {
    sendEmail: sendEmail
}

