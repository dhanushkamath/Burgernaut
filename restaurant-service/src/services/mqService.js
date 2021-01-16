const amqp = require("amqplib");
const { processOrder } = require('../controllers/orderController');
const { logger } = require('./loggerService');
const {EXCHANGE, QUEUE} = require('../resources/constants');
const PREFETCH_COUNT = parseInt(process.env.PREFETCH_COUNT) || 2;
const ORDER_DELIVERY_TIME = parseInt(process.env.ORDER_DELIVERY_TIME) || 10000;
const MQ_HOST = process.env.MQ_HOST || 'localhost';
const MQ_URL = `amqp://${MQ_HOST}:5672`;
let orderChannel = null;

/**
 * Connect to RabbitMQ and consumer orders
 */
const amqpConnectAndConsume = async () => {
    try {
        const mqConnection = await amqp.connect(MQ_URL);
        
        orderChannel = await mqConnection.createChannel();
        
        await orderChannel.assertExchange(EXCHANGE, 'fanout', {
            durable: false
        });

        // Ensure that the queue exists or create one if it doesn't
        await orderChannel.assertQueue(QUEUE);
        await orderChannel.bindQueue(QUEUE, EXCHANGE, '');

        // Only process <PREFETCH_COUNT> orders at a time
        orderChannel.prefetch(PREFETCH_COUNT);
        logger.info(`AMQP - connection established at ${MQ_URL} with prefetch count ${PREFETCH_COUNT} and delivery time ${ORDER_DELIVERY_TIME}ms`)

        orderChannel.consume(QUEUE, order => {
            processOrder(order, orderChannel);
        });
    }
    catch (ex) {
        logger.log('fatal',`AMQP - ${ex}`);
        process.exit();
    }
}

module.exports = {
    amqpConnectAndConsume: amqpConnectAndConsume
}
