const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/wallet/:id', usersController.getWallet);

module.exports = router;
