const amqp = require("amqplib");
const { sendConfirmation } = require('../controllers/emailController')
const { logger } = require('./loggerService')


// environment variables
const PREFETCH_COUNT = process.env.PREFETCH_COUNT || 2;

// create MQ connection string using environment variable
const MQ_HOST = process.env.MQ_HOST || 'localhost';
const MQ_URL = `amqp://${MQ_HOST}:5672`;
let orderChannel = null;

/**
 * Connect to RabbitMQ and consumer orders
 */
const amqpConnectAndConsume = async () => {
    try {
        const mqConnection = await amqp.connect(MQ_URL);
        logger.info(`AMQP - connection established at ${MQ_URL}`)
        
        orderChannel = await mqConnection.createChannel();
        
        var exchange = 'orders';
        await orderChannel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        // Ensure that the queue exists or create one if it doesn't
        await orderChannel.assertQueue("email-queue");
        await orderChannel.bindQueue("email-queue", exchange, '');
        

        // Only process <PREFETCH_COUNT> orders at a time
        orderChannel.prefetch(PREFETCH_COUNT);

        orderChannel.consume("email-queue", order => {
            sendConfirmation(order, orderChannel);
        });
    }
    catch (ex) {
        logger.level('fatal', ex);
    }
}

module.exports = {
    amqpConnectAndConsume: amqpConnectAndConsume
}
