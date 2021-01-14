const amqp = require("amqplib");

const msg = {total: 300, items: {burger: 5}}

const connect = async () => {
    try {
        const mqConnection = await amqp.connect("amqp://localhost:5672");
        const channel = await mqConnection.createChannel();
        
        var exchange = "orders"
        const result =  await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
       // Ensure that the exchange exists or create one
        channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
        console.log(`order placed`);
        return channel;
    }
    catch (ex) {
        console.error(ex);
        return null
    }
}

connect();