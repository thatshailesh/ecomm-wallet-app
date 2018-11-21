const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

/**
 * @api {post} /products/{id}/purchase Purchase product
 * @apiName Product purchase
 * @apiPermission admin
 * @apiGroup product
 *
 * @apiParam  {String} [id] productId
 * @apiParam  {String} [user_id] id of user
 *
 * @apiSuccess (200) {Object} mixed `Wallet` object
 */

router.post(
  '/:id/purchase',
  productsController.validate('purchase'),
  productsController.purchase
);

module.exports = router;
