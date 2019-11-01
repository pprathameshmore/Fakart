const mongoose = require('mongoose');

const ProductScheme = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductScheme);