const { sendEmail } = require('../services/emailService');

const EMAIL_ID = process.env.EMAIL_ID;
const TO_EMAIL_ID = process.env.TO_EMAIL_ID;

var mailOptions = {
    from: EMAIL_ID,
    to: TO_EMAIL_ID,
    subject: 'Burgernaut Order Confirmation',
    text: 'Thank you for ordering from Burgernaut. '
  };
/**
 * Send an email confirmation.
 */
const sendConfirmation = (order, orderChannel) => {
    orderContent = JSON.parse(order.content.toString());
    mailOptions.text += `Your order ${orderContent._id} amounting to ${orderContent.total} is confirmed and will be delivered shortly.`
    sendEmail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`${orderContent._id} confirmation sent:  ${info.response}`);
            orderChannel.ack(order);
        }
      })

}

module.exports = {
    sendConfirmation: sendConfirmation
}