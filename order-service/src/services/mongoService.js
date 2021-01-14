const mongoose = require('mongoose');

// environment variables
const MONGO_CONTAINER_NAME = process.env.MONGO_CONTAINER_NAME || 'localhost';

// mongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_CONTAINER_NAME}:27017/burgernautDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(err) {
        console.error('Mongo ERROR ' + err)
    }
})

module.exports = {
    mongoService: mongoose
}