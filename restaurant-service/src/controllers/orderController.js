const { orderSchema } = require('../models/orderModel');
const mongoose = require('mongoose');
const { changeOrderStatus } = require('../services/mongoService')
const { ORDER_ACCEPTED } = require('../resources/constants')

// Creating a model with Order as the object name and orderSchema as the Schema
const OrderModel = mongoose.model('Order', orderSchema)

/**
 * Process the order
 */
const processOrder = (orderId) => {
    changeOrderStatus(OrderModel, orderId, ORDER_ACCEPTED);
}

module.exports = {
    processOrder: processOrder
}