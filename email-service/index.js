const { startServer } = require('./src/app')
const { logger } = require('./src/services/loggerService')
const SLEEP_TIME = process.env.SLEEP_TIME || 30000;

// Sleep till MongoDB and RabbitMQ services start.
logger.info(`Sleeping for ${SLEEP_TIME}ms before connecting to RabbitMQ.`)
setTimeout(() => {
    startServer();
    logger.info(`email-service started`)
}, SLEEP_TIME)




