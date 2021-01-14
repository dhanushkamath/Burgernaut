const ITEM_PRICE = {
    burger: 50.0,
    fries: 20.0,
    coke: 10.0  
}

const MORGAN_CONFIG = ':method :url :status :res[content-length] :remote-addr - :response-time ms';
const ORDER_SERVICE_WELCOME_MSG = 'Welcome to the Burgernaut order service!'

module.exports = {
    ITEM_PRICE: ITEM_PRICE,
    MORGAN_CONFIG: MORGAN_CONFIG,
    ORDER_SERVICE_WELCOME_MSG: ORDER_SERVICE_WELCOME_MSG
}