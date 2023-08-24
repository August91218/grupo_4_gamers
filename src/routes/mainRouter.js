const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.js")

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/carrito", mainController.carrito);
router.get("/register", mainController.register);

module.exports = router;