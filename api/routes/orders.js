const express = require('express');
const router = express.Router();

var orders = [{
    "id": 1,
    "name": "Taylor Swift"
},
{
    "id": 2,
    "name": "Prathamesh More"
}];

router.get('/', (request, response, next) => {
    response.status(200).json({
        orders
    });
});

router.post('/', (request, response, next) => {
    response.status(201).json({
        status: 201,
        message: "Order is placed"
    });
});

router.get('/:id', (request, response, next) => {
    let id = request.params.id;
    orders.forEach((order) => {
        if (order.id == id) {
            response.status(200).json(order);
        } else {
            response.status(404).json({
                status: 404,
                message: "Order not fouund - " + id
            });
        }
    });
});


router.delete('/id', (request, response, next) => {
    let id = request.params.id;

    response.status(200).json({
        status: 200,
        message: "Order deleted - " + id
    });
});

module.exports = router;
