const EMAIL_SUBJECT = 'Burgernaut Order Confirmation';
const EMAIL_TEXT_DEFAULT = 'Thank you for ordering from Burgernaut. ';
const EXCHANGE = 'orders';
const QUEUE = 'orders.confirmations'

module.exports = {
    EMAIL_SUBJECT: EMAIL_SUBJECT,
    EMAIL_TEXT_DEFAULT: EMAIL_TEXT_DEFAULT,
    EXCHANGE: EXCHANGE,
    QUEUE: QUEUE
    
}