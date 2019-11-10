const express = require('express');
const moongose = require('mongoose');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

const OrderController = require('../controllers/orders');

router.get('/', OrderController.order_gets_all);
router.post('/', checkAuth, OrderController.order_create);
router.get('/:id', OrderController.order_get_single);
router.patch('/:id', checkAuth, OrderController.order_update);
router.delete('/:id', checkAuth, OrderController.order_remove);

module.exports = router;