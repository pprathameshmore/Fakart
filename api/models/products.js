const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    productImage : {type : String}
});

module.exports = mongoose.model('Product', ProductScheme);