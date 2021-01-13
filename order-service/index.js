const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { orderRouter } = require('./src/routes/orderRouter')

// environment variables
const PORT = process.env.PORT || 3000;
const MONGO_CONTAINER_NAME = process.env.MONGO_CONTAINER_NAME || 'localhost';

// create an express app
const app = express();

// add basic logging
app.use(morgan(':method :url :status :res[content-length] :remote-addr - :response-time ms'));

// middleware to parse request
app.use(express.json());

// mongoDB connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_CONTAINER_NAME}:27017/burgernautDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err) => {
    if(err) {
        console.error('ERROR ' + err)
    }
})

app.route('/api/info').get((req,res) =>{
    res.json({
        message: `Welcome to the Burgernaut order service!`
    })
})

app.use('/api/orders', orderRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
