const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.js")

router.get('/tienda', productsController.index);
router.get('/tienda/detail/:id/', productsController.detail);

module.exports = router;