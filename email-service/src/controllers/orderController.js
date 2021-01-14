/**
 * Send an email confirmation.
 */
const sendConfirmation = (order, orderChannel) => {
    orderContent = JSON.parse(order.content.toString());
    console.log(`Confirmation sent for order ${orderContent._id}`)
    orderChannel.ack(order);
}

module.exports = {
    sendConfirmation: sendConfirmation
}