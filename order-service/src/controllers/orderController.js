const mongoose = require('mongoose');
const { orderSchema } = require('../models/orderModel');
const { ITEM_PRICE } = require('../resources/constants');

// Creating a model with Order as the object name and orderSchema as the Schema
const Order = mongoose.model('Order', orderSchema)

/**
 * Place a new order
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const placeOrder = (req, res) => {
    let orderDetails = req.body;

    // calculate total amount
    orderDetails.total = orderDetails.items.reduce((currentTotal, item) => {
        return currentTotal + ITEM_PRICE[item.name]*item.quantity
    }, 0);

    let newOrder = new Order(orderDetails);
    newOrder.save((err, order) => {
        // place the order on the queue
        req.exchangeServices.publishOrderToExchange(order); 
        
        if (err) {
            console.error(err);
            res.status(500).json({
                error: `An unknown server error occurred.`
            });
        }

        res.status(201).json(order);
    })
}

/**
 * Fetch order details based on order ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getOrderById = (req,res) => {
    Order.findById(req.params.orderId).select('-__v -items._id').exec((err, order) => {
        if (err) {
            console.log(`Error Name: ${err.name}: ${err.message}`)
            console.error(err);
            res.status(500).json({
                error: `An unknown server error occurred.`
            });
        }
        res.status(200).json(order);
    })
}

module.exports = {
    placeOrder: placeOrder,
    getOrderById: getOrderById
}