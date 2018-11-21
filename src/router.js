const express = require('express');
const usersRoute = require('./routes/users');
const productRoute = require('./routes/product');
const salesRoute = require('./routes/sales');

const router = express.Router();

router.use('/users', usersRoute);
router.use('/products', productRoute);
router.use('/sales', salesRoute);

module.exports = router;
