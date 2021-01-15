const express = require('express');
const morgan = require('morgan');
const { addRoutes } = require('./routes/api');
const { MORGAN_CONFIG } = require('./resources/constants');
const { logger } = require('./services/loggerService');
const { errorHandlerMiddleware } = require('./services/errorHandlingService');
const { mongoConnect } = require('./services/mongoService');
const PORT = process.env.PORT || 3000;

startServer = () => {
    // mongo connection
    mongoConnect();

    // amqp exchange services
    const { injectExchangeService } = require('./services/mqService');

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
        logger.info(`Order-service listening on port ${PORT}`);
    })
}

module.exports = {
    startServer: startServer
}