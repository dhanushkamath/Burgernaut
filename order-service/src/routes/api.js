const { menuRouter } = require('./menuRouter');
const { orderRouter } = require('./orderRouter');
const { infoRouter } = require('./infoRouter');
const { ORDER_SERVICE_WELCOME_MSG } = require('../resources/constants')

/**
 * Generates all routes for the application.
 * @param {Function} app - Express Function
 */
const addRoutes = (app) => {
    app.use('/api/info', infoRouter);    
    app.use('/api/menu', menuRouter);
    app.use('/api/orders', orderRouter);
}

module.exports = {
    addRoutes: addRoutes
}