const amqp = require("amqplib");


const connect = async () => {
    try {
        const mqConnection = await amqp.connect("amqp://localhost:5672");
        const channel = await mqConnection.createChannel();
        const result = await channel.assertQueue("orders"); // Ensure that the queue exists or create one

        channel.consume("orders", message => {
            console.log(message.content.toString());
            channel.ack(message);
        });

        console.log("Waiting for orders");
        
    }
    catch (ex) {
        console.error(ex);
    }
}

connect();