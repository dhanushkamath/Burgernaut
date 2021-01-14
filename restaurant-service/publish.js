const amqp = require("amqplib");

const msg = {total: 300, items: {burger: 5}}

const connect = async () => {
    try {
        const mqConnection = await amqp.connect("amqp://localhost:5672");
        const channel = await mqConnection.createChannel();
        const result = channel.assertQueue("orders"); // Ensure that the queue exists or create one
        channel.sendToQueue("orders", Buffer.from(JSON.stringify(msg)));
        console.log(`order placed`);
        return channel;
    }
    catch (ex) {
        console.error(ex);
        return null
    }
}

connect();