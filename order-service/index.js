const express = require('express');
const morgan = require('morgan');
const { addRoutes } = require('./src/routes/api');
const { MORGAN_CONFIG } = require('./src/resources/constants');
const { logger } = require('./src/services/loggerService');
const { errorHandlerMiddleware } = require('./src/services/errorHandlingService');
const { mongoConnect } = require('./src/services/mongoService');

// mongo connection
mongoConnect();

// amqp exchange services
const { injectExchangeService } = require('./src/services/mqService');

// environment variables
const PORT = process.env.PORT || 3000;

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