const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Product = require('../models/products');

router.get('/', (request, response, next) => {
    Product.find({}, (error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            console.log(product.length);
            if (product.length == 0 || product == undefined) {
                response.status(204).json({
                    message: "No content",
                    product
                });
            } else {
                response.status(200).json({
                    count: product.length,
                    message: "All products",
                    product
                });
            }
        }
    }
    ).select('name price _id');
});

router.post('/', (request, response, next) => {
    const product = new Product({
        name: request.body.name,
        price: request.body.price
    });
    product.save((error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            console.log(product);
            response.status(201).json({
                message: "Product saved",
                product
            });
        }
    }
    );
});

router.get('/:id', (request, response, next) => {
    let id = request.params.id;

    Product.findById(id, (error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            if (product) {
                response.status(200).json({
                    message: "Product with ID",
                    product
                });
            } else {
                response.status(404).json({
                    message: "Not found",
                    product
                });
            }

        }
    }).select('name price _id');

});

router.patch('/:id', (request, response, next) => {
    let _id = request.params.id;
    let name = request.body.name;
    let price = request.body.price;
    Product.findByIdAndUpdate(_id, { $set: { name: name, price: price } }, (error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            if (product) {
                response.status(200).json({
                    message: "Product updated",
                    product
                });
            } else {
                response.status(404).json({
                    message: "Not found",
                    product
                });
            }
        }
    })

});

router.delete('/:id', (request, response, next) => {
    Product.findByIdAndDelete({ _id: request.params.id }, (error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            if (product) {
                response.status(200).json({
                    message: "Product removed",
                    product
                });
            } else {
                response.status(404).json({
                    message: "Not found",
                    product
                });
            }

        }
    });
});

module.exports = router;