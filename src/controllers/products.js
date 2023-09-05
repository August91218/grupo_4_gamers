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
    },
    create: (req, res) => {
        res.render('productCreate');
    },
    postCreate: (req, res) => {
        let data = req.body;

        const products = JSON.parse(fs.readFileSync(jsonProducts));

        let newProduct = {
            id: products[products.length - 1].id + 1,
            name: data.name, 
            preview: data.preview,
            description: data.description,
            image: "default-image.png",
            price: parseInt(data.price),
            category: data.category
            
            
        }
        products.push(newProduct);
        
        fs.writeFileSync(jsonProducts, JSON.stringify(products));

        res.redirect('/tienda');
    }
}
module.exports = controlador;