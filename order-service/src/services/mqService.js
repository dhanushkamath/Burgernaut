const amqp = require("amqplib");

// create MQ connection string using environment variable
const MQ_HOST = process.env.MQ_HOST || 'localhost';
const MQ_URL = `amqp://${MQ_HOST}:5672`;

// establish mq connection
let orderChannel = null;
const amqpConnect = async () => {
    try {
        const mqConnection = await amqp.connect(MQ_URL);
        console.info("AMQP connection established")
        
        orderChannel = await mqConnection.createChannel();
        
        // Ensure that the queue exists or create one if it doesn't
        const result = orderChannel.assertQueue("orders");
    }
    catch (ex) {
        console.error(ex);
    }
}
amqpConnect();

/**
 * Publish order to queue
 * @param {Object} order - order object containing order details
 */
const publishOrderToQueue = (order) => {
    orderChannel.sendToQueue("orders", Buffer.from(JSON.stringify(order)));
    console.info(`order ${order._id} placed`);
}

/**
 * An express middleware for injecting queue services into the request object.
 * @param {Object} req - express request object.
 * @param {Object} res - express response object.
 * @param {Function} next - express next() function.
 */
const injectQueueServices = (req, res, next) => {
    // Add all queue operations here
    const queueServices = {
        publishOrderToQueue: publishOrderToQueue
    }
    
    req.queueServices = queueServices;
    next();
}

module.exports = {
    injectQueueServices: injectQueueServices
}
