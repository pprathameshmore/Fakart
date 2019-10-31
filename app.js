const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const productsRouter = require('./api/routes/products')
const orderRouter = require('./api/routes/orders');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/products', productsRouter);
app.use('/orders', orderRouter);

module.exports = app;

