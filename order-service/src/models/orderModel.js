const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
 * Schema for item sub-document
*/
itemSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    quantity: {
        type: Number,
        default: 1
    }
})

/*
 * Schema for order document
*/
orderSchema = new Schema({
    items: {
        type: [itemSchema],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'delivered'],
        default: 'pending'
    }
})
  
module.exports = {
    orderSchema: orderSchema
}
  