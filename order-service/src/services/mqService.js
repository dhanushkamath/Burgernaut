const amqp = require("amqplib");
const { logger } = require('./loggerService')
const MQ_HOST = process.env.MQ_HOST || 'localhost'; // create MQ connection string using environment variable
const MQ_URL = `amqp://${MQ_HOST}:5672`;
const EXCHANGE = "orders";
let orderChannel = null;


/**
 * Connect to RabbitMQ
 */
const amqpConnect = async () => {
    try {
        const mqConnection = await amqp.connect(MQ_URL);
        orderChannel = await mqConnection.createChannel();
        
        await orderChannel.assertExchange(EXCHANGE, 'fanout', {
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
    orderChannel.publish(EXCHANGE,'', Buffer.from(JSON.stringify(order)));
    logger.info(`AMQP - order ${order._id} placed`);
}

/**
 * An express middleware for injecting queue services into the request object.
 * @param {Object} req - express request object.
 * @param {Object} res - express response object.
 * @param {Function} next - express next() function.
 */
const injectExchangeService = (req, res, next) => {
    // add all exchange operations here
    const exchangeServices = {
        publishOrderToExchange: publishOrderToExchange
    }
    // inject exchangeServices in request object
    req.exchangeServices = exchangeServices;
    next();
}

module.exports = {
    injectExchangeService: injectExchangeService,
    amqpConnect: amqpConnect
}
