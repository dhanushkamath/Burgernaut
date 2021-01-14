const amqp = require("amqplib");


const connect = async () => {
    try {
        const mqConnection = await amqp.connect("amqp://localhost:5672");
        const channel = await mqConnection.createChannel();
        
        var exchange = 'orders';

        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        // Ensure that the queue exists or create one if it doesn't
        await channel.assertQueue("email-queue");
        await channel.bindQueue("email-queue", exchange, '');
        
        channel.consume("email-queue", message => {
            console.log(`EMAIL SERVICE: ${message.content.toString()}`);
            channel.ack(message);
        });

        console.log("Waiting for orders");
        
    }
    catch (ex) {
        console.error(ex);
    }
}

connect();