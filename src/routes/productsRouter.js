const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.js")

router.get('/tienda', productsController.index);
router.get('/tienda/detail/:id/', productsController.detail);
router.get('/tienda/vender/',productsController.create);
router.post('/tienda/vender/', productsController.postCreate);

module.exports = router;