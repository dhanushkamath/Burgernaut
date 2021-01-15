const { amqpConnectAndConsume} = require('./services/mqService')

const startServer = () => {
    // Connect to RabbitMQ and consume orders
    amqpConnectAndConsume();
}

module.exports = {
    startServer: startServer
}

