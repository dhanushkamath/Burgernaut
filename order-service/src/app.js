const express = require('express');
const morgan = require('morgan');
const { addRoutes } = require('./routes/api');
const { MORGAN_CONFIG } = require('./resources/constants');
const { logger } = require('./services/loggerService');
const { errorHandlerMiddleware } = require('./services/errorHandlingService');
const { mongoConnect } = require('./services/mongoService');
const PORT = process.env.PORT || 3000;
const { injectExchangeService, amqpConnect } = require('./services/mqService');

startServer = () => {
    // mongo connection
    mongoConnect();

    // establish mq connection
    amqpConnect();
    
    // create an express app
    const app = express();

    // middleware to add basic logging
    app.use(morgan(MORGAN_CONFIG, { stream: logger.stream }));

    // middleware to parse request
    app.use(express.json());

    // middleware to inject message-queue services
    app.use(injectExchangeService);

    // add all routes
    addRoutes(app);

    // error handling
    app.use(errorHandlerMiddleware)


    app.listen(PORT, () => {
        logger.info(`order-service listening on port ${PORT}`);
    })
}

module.exports = {
    startServer: startServer
}