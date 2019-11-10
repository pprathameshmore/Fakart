const Product = require('../models/product');
const checkAuth = require('../middlewares/check-auth');
const multer = require('multer');



exports.product_get_all = (request, response, next) => {

    Product.find({}).select('name price _id productImage').exec().then(products => {
        if (products.length === 0 || products === null || products === undefined) {
            return response.status(204).json({
                message: "No content",
                products
            })
        } else {
            return response.status(200).json({
                count: products.length,
                message: "All products",
                products
            });
        }
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}


exports.product_asc = (request, response, next) => {
    if (request.params.name === undefined) {
        Product.find({}).sort({
            price: 1
        }).select('_id name price productImage').exec().then(products => {
            return response.status(200).json({
                count: products.length,
                message: "Order ascending by price",
                products
            });
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            });
        });
    } else if (request.params.name === 'name') {
        Product.find({}).sort({
            name: 1
        }).select('name price _id productImage').exec().then(products => {
            return response.status(200).json({
                count: products.length,
                message: "Order ascending by name",
                products
            });
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            })
        });
    } else {
        return response.status(404).json({
            message: "Wrong parameters",
        });

    }
}

exports.product_desc = (request, response, next) => {

    if (request.params.name === undefined) {

        Product.find({}).sort({
            price: -1
        }).select('name price _id productImage').exec().then(products => {
            return response.status(200).json({
                count: products.length,
                message: "Order descending by price",
                products
            });
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            })
        });
    } else if (request.params.name === 'name') {
        Product.find({}).sort({
            name: -1
        }).select('name price _id productImage').exec().then(products => {
            response.status(200).json({
                count: products.length,
                message: "Order descending by name",
                products
            });
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            });
        });
    } else {
        return response.status(404).json({
            message: "Wrong parameters",
        });
    }
}

exports.pro_get_uploads = (request, response, next) => {
    let fileName = request.params.fileName;
    //Look for image now
    response.setHeader('Content-type', 'image/jpeg')
        .status(200).sendFile('uploads/' + fileName, (error) => {
            if (error) {
                console.log(error);
            }
        });
}

exports.product_create = (request, response, next) => {
    const product = new Product({
        name: request.body.name,
        price: request.body.price,
        productImage: request.file.path
    });

    product.save().then(product => {
        response.status(201).json({
            message: "Product saved",
            product
        });
    }).catch(error => {
        response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}

exports.product_get_single = (request, response, next) => {
    let id = request.params.id;

    Product.findById(id).select('name price _id productImage').exec().then(product => {
        if (product === null) {
            return response.status(404).json({
                message: "Product not found",
            });
        } else {
            return response.status(200).json({
                message: "Product with ID",
                product
            });
        }

    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
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
    }).exec().then(product => {
        return response.status(200).json({
            message: "Product updated",
            product
        });
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}

exports.product_delete = (request, response, next) => {

    Product.findByIdAndDelete({
        _id: request.params.id
    }).exec().then(product => {
        if (product) {
            return response.status(200).json({
                message: "Product removed",
                product
            });
        } else {
            return response.status(404).json({
                message: "Not found",
                product
            });
        }
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}