const { mongoConnect } = require('./services/mongoService');
const { amqpConnectAndConsume} = require('./services/mqService');
const { logger } = require('./services/loggerService')
const SLEEP_TIME = process.env.SLEEP_TIME || 30000;

startServer = () => {
    // Connect to MongoDB
    mongoConnect();
    // Connect to RabbmitMQ and consume orders
    amqpConnectAndConsume();
}

module.exports = {
    startServer: startServer
}




