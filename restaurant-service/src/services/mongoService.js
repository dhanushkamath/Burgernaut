const mongoose = require('mongoose');

// environment variables
const MONGO_CONTAINER_NAME = process.env.MONGO_CONTAINER_NAME || 'localhost';

/**
 * Connect to MongoDB
 */
const mongoConnect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${MONGO_CONTAINER_NAME}:27017/burgernautDB`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {  
        if(err) {
            console.error('Mongo ERROR ' + err)
        }
    })
}


/**
 * Change order status with ID
 * @param {mongoose.Model} model - mongoose.Model to search DB.
 * @param {String} orderId - Order ID.
 * @param {String} status - new status.
 */
const changeOrderStatus = (OrderModel, orderId, status) => {
    OrderModel.findByIdAndUpdate(orderId, { status: status }, (err, order) => { 
        if (err){ 
            console.err(err) 
        } 
        else{ 
            console.info(`${orderId} ${status}`); 
        } 
    }); 
}

module.exports = {
    mongoConnect: mongoConnect,
    changeOrderStatus: changeOrderStatus
}