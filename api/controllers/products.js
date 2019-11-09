const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');



exports.product_get_all = (request, response, next) => {
    Product.find({}, (error, product) => {
        if (error) {
            response.status(404).json({
                message: "Something went wrong",
                error
            });
        } else {
            console.log(product.length);
            if (product.length === 0 || product === undefined) {
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
    }).select('name price _id productImage');
}

exports.pro_get_uploads = (request, response, next) => {
    let fileName = request.params.fileName;
    console.log(fileName);
    //Look for image now
    response.setHeader('Content-type', 'image/jpeg')
        .status(200).sendFile('uploads/' + fileName, (error) => {
            if (error) {
                console.log(error);
            }
        });
}

exports.product_create =  (request, response, next) => {
    const product = new Product({
        name: request.body.name,
        price: request.body.price,
        productImage: request.file.path
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
            return;
        }
    });
}

exports.product_get_single = (request, response, next) => {
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
    }).select('name price _id productImage');

}

exports.product_update = (request, response, next) => {
    let _id = request.params.id;
    let name = request.body.name;
    let price = request.body.price;
    Product.findByIdAndUpdate(_id, {
        $set: {
            name: name,
            price: price
        }
    }, (error, product) => {
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
}

exports.product_delete = (request, response, next) => {
    Product.findByIdAndDelete({
        _id: request.params.id
    }, (error, product) => {
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
}

