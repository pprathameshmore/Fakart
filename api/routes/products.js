const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const checkAuth = require('../middleware/check-auth');
const Product = require('../models/product');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, './uploads');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});



router.get('/', ProductsController.product_get_all);

router.get('/uploads/:fileName', ProductsController.pro_get_uploads);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.product_create);

router.get('/:id', ProductsController.product_get_single);

router.patch('/:id', checkAuth, ProductsController.product_update);

router.delete('/:id', checkAuth, ProductsController.product_delete);

module.exports = router;