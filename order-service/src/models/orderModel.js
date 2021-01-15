const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
 * Schema for item sub-document
*/
itemSchema = new Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    }
})

/*
 * Schema for order document
*/
orderSchema = new Schema({
    items: {
        type: [itemSchema],
        required: true
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
    },
    email: {
        type: String,
        required: true
    }
})

orderSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email); // Assuming email has a text attribute
 }, 'Invalid e-mail.')

module.exports = {
    orderSchema: orderSchema
}
  