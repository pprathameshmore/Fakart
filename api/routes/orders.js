const express = require('express');
const moongose = require('mongoose');
const router = express.Router();

const Order = require('../models/orders');
const Product = require('../models/products');

router.get('/', (request, response, next) => {
    Order.find({}, (error, order) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            console.log(order);
            if (order.length == 0 || order == undefined) {
                response.status(204).json({
                    message: "No content",
                    order
                });
            } else {
                response.status(200).json({
                    count: order.length,
                    message: "All orders",
                    order
                });
            }
        }
    }).select('quantity _id productID');
});


router.post('/', (request, response, next) => {

    Product.findById(request.body.productID, (error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            const order = new Order({
                productID: request.body.productID,
                quantity: request.body.quantity
            });
            order.save((error, order) => {
                if (error) {
                    console.log(error);
                    response.status(404).json({
                        message: "Not found",
                        error
                    });
                } else {
                    console.log(order);
                    response.status(200).json({
                        message: "Order updated",
                        order
                    });
                }
            });
        }
    });
});

router.get('/:id', (request, response, next) => {
    let orderID = request.params.id;
    Order.findById(orderID, (error, order) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            if (order) {
                response.status(200).json({
                    message: "Order with ID",
                    order
                });
            } else {
                response.status(404).json({
                    message: "Not found",
                    order
                });
            }
        }
    }).select('quantity _id productID');
});

router.patch('/:id', (request, response, next) => {
    let orderID = request.params.id;
    let quantity = request.body.quantity;
    let productID = request.body.productID;

    Order.findByIdAndUpdate(orderID, { $set: { quantity: quantity, productID: productID } }, (error, order) => {
        if (error) {

        } else {
            if (order) {
                response.status(200).json({
                    message: "Order updated",
                    order
                });
            } else {
                response.status(404).json({
                    message: "Not found",
                    order
                });
            }
        }
    }).catch((error) => {
        response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
});


router.delete('/:id', (request, response, next) => {
    let id = request.params.id;

    Order.findByIdAndDelete(id, (error, order) => {

        if (error) {
            response.status(404).json({
                message: "Not found",
                error
            });
        } else {
            response.status(200).json({
                message: "Order removed",
                order
            });
        }
    })
});

module.exports = router;
