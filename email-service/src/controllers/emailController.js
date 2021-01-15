const { sendEmail } = require('../services/emailService');
const { logger } = require('../services/loggerService');
const { EMAIL_SUBJECT, EMAIL_TEXT_DEFAULT } = require('../resources/constants');

const EMAIL_ID = process.env.EMAIL_ID;

var mailOptions = {
    from: EMAIL_ID,
    to: '',
    subject: EMAIL_SUBJECT,
    text: EMAIL_TEXT_DEFAULT
  };
  
/**
 * Send an email confirmation.
 */
const sendConfirmation = (order, orderChannel) => {
    orderContent = JSON.parse(order.content.toString());
    mailOptions.text += `Your order ${orderContent._id} amounting to ${orderContent.total} is confirmed and will be delivered shortly.`
    mailOptions.to = orderContent.email;
    sendEmail(mailOptions, (error, info) => {
        if (error) {
            logger.log('crit',`email - failed to send confirmation to ${orderContent.email} for order ${orderContent._id}.`)
        } else {
            logger.info(`email - confirmation sent to ${orderContent.email} for order ${orderContent._id}.`);
            orderChannel.ack(order);
        }
      })

}

module.exports = {
    sendConfirmation: sendConfirmation
}