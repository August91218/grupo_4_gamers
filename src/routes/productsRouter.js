const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const productsController = require("../controllers/products.js")

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images')
    },
    filename: function (req, file, cb){
        cb(null,
            `${Date.now()}_img_${path.extname(file.originalname)}`);
    }
})
const uploadFile = multer({ storage });

router.get('/', productsController.index);
router.get('/detail/:id/', productsController.detail);

//editar un producto
router.put('/edit/:id/',uploadFile.single('product-image'), productsController.processEdit);
router.get('/edit/:id/', productsController.edit);

//crear un producto
router.get('/vender/', productsController.create);
router.post('/vender/',uploadFile.single('product-image'), productsController.postCreate);

//borrar un producto
router.post('/delete/:id/', productsController.destroy);

module.exports = router;