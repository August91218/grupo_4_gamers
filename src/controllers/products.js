const path = require('path');
const fs = require('fs');

const jsonProducts = path.join(__dirname, '../data/products.json');

const controlador = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts));
        res.render('tienda', {products});
    },
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts));
        const product = products.find(products => {
            return products.id == req.params.id
        });
        res.render('productDetail', {product});
    }
}
module.exports = controlador;