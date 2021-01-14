const amqp = require("amqplib");

// create MQ connection string using environment variable
const MQ_HOST = process.env.MQ_HOST || 'localhost';
const MQ_URL = `amqp://${MQ_HOST}:5672`;
let orderChannel = null;
var exchange = "orders"

/**
 * Connect to RabbitMQ
 */
const amqpConnect = async () => {
    try {
        const mqConnection = await amqp.connect(MQ_URL);
        orderChannel = await mqConnection.createChannel();
        
        await orderChannel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        console.info("AMQP connection established")
        
    }
    catch (ex) {
        console.error(ex);
    }
}

/**
 * Publish order to queue
 * @param {Object} order - order object containing order details
 */
const publishOrderToExchange = (order) => {
    orderChannel.publish(exchange,'', Buffer.from(JSON.stringify(order)));
    console.info(`order ${order._id} placed`);
}

/**
 * An express middleware for injecting queue services into the request object.
 * @param {Object} req - express request object.
 * @param {Object} res - express response object.
 * @param {Function} next - express next() function.
 */
const injectExchangeServices = (req, res, next) => {
    // Add all queue operations here
    const exchangeServices = {
        publishOrderToExchange: publishOrderToExchange
    }
    
    req.exchangeServices = exchangeServices;
    next();
}

// establish mq connection
amqpConnect();

module.exports = {
    injectExchangeServices: injectExchangeServices
}
