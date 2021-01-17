const mongoose = require('mongoose');
const { logger } = require('./loggerService');

// environment variables
const MONGO_CONTAINER_NAME = process.env.MONGO_HOST || 'localhost';
const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/burgernautDB`;

/**
 * Connect to MongoDB
 */
const mongoConnect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {  
        if(err) {
            console.error('Mongo ERROR ' + err)
        }
    })
    mongoose.connection.on('connected', function () {  
        logger.log('info',`Mongoose - connection established at ${MONGO_URI}`);
    }); 
    
    // If the connection throws an error
    mongoose.connection.on('error',function (err) {  
        logger.log('fatal',`Mongoose - connection error: ${MONGO_URI}`);
    }); 
    
    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {  
        logger.log('fatal',`Mongoose - disconnected: ${MONGO_URI}`);
    });
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
            logger('fatal', `Mongoose - ${err}`)
        } 
        else{ 
            logger.info(`Order - ${orderId} ${status}`); 
        } 
    }); 
}

module.exports = {
    mongoConnect: mongoConnect,
    changeOrderStatus: changeOrderStatus
}