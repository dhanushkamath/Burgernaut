const express = require('express');
const morgan = require('morgan');
const { addRoutes } = require('./src/routes/api')
const { MORGAN_CONFIG } = require('./src/resources/constants')

// mongo connection
const { mongoService } = require('./src/services/mongoService');

// message-queue services
const { injectExchangeServices } = require('./src/services/mqService');

// environment variables
const PORT = process.env.PORT || 3000;

// create an express app
const app = express();

// middleware to add basic logging
app.use(morgan(MORGAN_CONFIG));

// middleware to parse request
app.use(express.json());

// middleware to inject message-queue services
app.use(injectExchangeServices);

// add all routes
addRoutes(app);

app.listen(PORT, () => {
    console.info(`Order-service listening on port ${PORT}`)
})