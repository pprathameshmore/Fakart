const express = require('express');
const router = express.Router();

var products = [{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-pair-of-white-sneakers-isolated-on-white-background-sport-shoes-712448377.jpg",
    "name": "Sport Shoes",
    "price": 110
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-vintage-red-shoes-on-white-background-92008067.jpg",
    "name": "Red SNEAKER",
    "price": 91
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-pink-and-black-sport-woman-shoes-isolated-on-white-background-709418083.jpg",
    "name": "Sport Shoes Women",
    "price": 94
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-children-s-autumn-or-winter-fashion-boots-isolated-on-white-background-708900334.jpg",
    "name": "Winter boots children",
    "price": 143
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-bangkok-thailand-january-onitsuka-tiger-asics-gel-lyte-iii-on-january-in-bangkok-292088969.jpg",
    "name": "Sports shoes Red-White",
    "price": 150
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-leather-shoes-isolated-on-white-background-including-clipping-path-216565609.jpg",
    "name": "Black leather shoes",
    "price": 250
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-casual-shoes-on-white-background-included-clipping-path-667459072.jpg",
    "name": "Shoes Canvas",
    "price": 50
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-white-sneakers-on-white-background-including-clipping-path-1100736923.jpg",
    "name": "Shoes White",
    "price": 85
},
{
    "imgUrl": "https://image.shutterstock.com/z/stock-photo-yellow-sneakers-15066415.jpg",
    "name": "Sneakers Yellow",
    "price": 125
}
];

router.get('/', (request, response, next) => {
    response.status(200).json({
        products
    })
});

router.post('/', (request, response, next) => {
    response.status(201).json({
        status: 201,
        message: "Product added"
    });
});

router.get('/:name', (request, response, next) => {
    let name = request.params.name;

    products.forEach((product) => {
        if (product.name == name) {
            response.status(200).json(product);
        } else {
            response.status(404).json({
                status: 404,
                message: "Product not fouund - " + name
            });
        }
    });
});

router.patch('/:name', (request, response, next) => {
    let name = request.params.name;

    response.status(200).json({
        status: 200,
        message: "Product details updated -" + name
    });

});

router.delete('/:name', (request, response, next) => {
    let name = request.params.name;

    response.status(200).json({
        status: 200,
        message: "Product deleted - " + name
    });
});

module.exports = router;