const mongoose = require('mongoose');
const { logger } = require('./loggerService')

// environment variables
const MONGO_CONTAINER_NAME = process.env.MONGO_CONTAINER_NAME || 'localhost';
const MONGO_URI = `mongodb://${MONGO_CONTAINER_NAME}:27017/burgernautDB`;

// mongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(err) {
        logger.log('fatal', err);
        logger.log('trace', err.stack);
    }
})

mongoose.connection.on('connected', function () {  
    logger.log('info',`Mongoose - connection successful: ${MONGO_URI}`);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
    logger.log('fatal',`Mongoose - connection error: ${MONGO_URI}`);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
    logger.log('fatal',`Mongoose - disconnected: ${MONGO_URI}`);
});
  

module.exports = {
    mongoService: mongoose
}