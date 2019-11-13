const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const MONGO_DB_URL = "mongodb+srv://prathamesh:9420776721@cluster0-idvei.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(MONGO_DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useMongoClient: true
}, () => {
    console.log("Connected to Database");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.use('/uploads', express.static('uploads'));

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    next();
});

const productsRouter = require('./api/routes/products')
const orderRouter = require('./api/routes/orders');
const userRouter = require('./api/routes/users');

app.use('/products', productsRouter);
app.use('/orders', orderRouter);
app.use('/user', userRouter);


app.use((resquest, response, next) => {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, resquest, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;