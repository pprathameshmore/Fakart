const Order = require('../models/order');
const Product = require('../models/product');

exports.order_gets_all = (request, response, next) => {

    Order.find({}).select('quantity _id productID').exec().then(order => {
        if (order.length === 0 || order === undefined) {
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
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}

exports.order_create = (request, response, next) => {

    Product.findById(request.body.productID).exec().then(result => {
        const order = new Order({
            productID: request.body.productID,
            quantity: request.body.quantity
        });
        order.save().then(order => {
            return response.status(200).json({
                message: "Order created",
                order
            });
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            });
        });
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}

exports.order_get_single = (request, response, next) => {
    Order.findById(request.params.id).select('quantity _id productID').exec().then(order => {

        if (order) {
            return response.status(200).json({
                message: "Order with ID",
                order
            });
        } else {
            return response.status(404).json({
                message: "Order not found"
            });
        }
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}

exports.order_update = (request, response, next) => {

    Product.findById(request.body.productID).exec().then(product => {

        Order.findByIdAndUpdate(request.params.id, {
            $set: {
                quantity: request.body.quantity,
                productID: request.body.productID
            }
        }).exec().then(order => {
            return response.status(200).json({
                message: "Order updated",
                order
            });
        }).catch(error => {
            return response.status(404).json({
                message: "Something went wrong",
                error
            });
        });
    }).catch(error => {
        return response.status(404).json({
            message: "Something went wrong",
            error
        });
    });


}

exports.order_remove = (request, response, next) => {

    Order.findByIdAndDelete(request.params.id).exec().then(order => {
        if (order === null) {
            return response.status(404).json({
                message: "Order not found"
            })
        } else {
            return response.status(200).json({
                message: "Order removed"
            });
        }
    }).catch(error => {
        response.status(404).json({
            message: "Something went wrong",
            error
        });
    });
}