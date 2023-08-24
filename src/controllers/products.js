const path = require('path');
const fs = require('fs');

const jsonProducts = path.join(__dirname, '../data/products.json');

const controlador = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts));
        res.render('tienda', {products});
    },
    detail: (req, res) => {
        res.render('productDetail');
    }
}
module.exports = controlador;