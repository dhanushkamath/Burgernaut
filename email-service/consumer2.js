const amqp = require("amqplib");


const connect = async () => {
    try {
        const mqConnection = await amqp.connect("amqp://localhost:5672");
        const channel = await mqConnection.createChannel();
        
        var exchange = 'orders';

        const result =  await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        // Ensure that the queue exists or create one if it doesn't
        const result2 = await channel.assertQueue("order-queue");

        const result3 = await channel.bindQueue("order-queue", exchange, '');
        
        channel.consume("order-queue", message => {
            console.log(`ORDER SERVICE: ${message.content.toString()}`);
            channel.ack(message);
        });

        console.log("Waiting for orders");
        
    }
    catch (ex) {
        console.error(ex);
    }
}

connect();