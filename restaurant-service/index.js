const { mongoConnect } = require('./src/services/mongoService');
const { amqpConnectAndConsume} = require('./src/services/mqService')

// Connect to MongoDB
mongoConnect();

// Connect to RabbmitMQ and consume orders
amqpConnectAndConsume();

