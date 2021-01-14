const { orderSchema } = require('../models/orderModel');
const mongoose = require('mongoose');
const { changeOrderStatus } = require('../services/mongoService')
const { ORDER_ACCEPTED, ORDER_DELIVERED } = require('../resources/constants')

// Creating a model with Order as the object name and orderSchema as the Schema
const OrderModel = mongoose.model('Order', orderSchema)

/**
 * Process the order
 */
const processOrder = (orderId) => {
    changeOrderStatus(OrderModel, orderId, ORDER_ACCEPTED);
    setTimeout(() => {
        changeOrderStatus(OrderModel, orderId, ORDER_DELIVERED);
    }, 20000);
}

module.exports = {
    processOrder: processOrder
}