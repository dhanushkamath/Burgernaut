const amqp = require("amqplib");
const { logger } = require('./loggerService')

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

        logger.info(`AMQP - connection established at ${MQ_URL}`)
        
    }
    catch (ex) {
        logger.log('fatal',`AMQP - ${ex}`);
        process.exit();
    }
}


/**
 * Publish order to queue
 * @param {Object} order - order object containing order details
 */
const publishOrderToExchange = (order) => {
    orderChannel.publish(exchange,'', Buffer.from(JSON.stringify(order)));
    logger.info(`AMQP - order ${order._id} placed`);
}

/**
 * An express middleware for injecting queue services into the request object.
 * @param {Object} req - express request object.
 * @param {Object} res - express response object.
 * @param {Function} next - express next() function.
 */
const injectExchangeService = (req, res, next) => {
    // Add all exchange operations here
    const exchangeServices = {
        publishOrderToExchange: publishOrderToExchange
    }
    
    req.exchangeServices = exchangeServices;
    next();
}

// establish mq connection
amqpConnect();

module.exports = {
    injectExchangeService: injectExchangeService
}
