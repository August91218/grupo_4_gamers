const path = require('path');
const fs = require('fs');

const jsonProducts = path.join(__dirname, '../data/products.json');

const controlador = {
    carrito: (req,res) =>{
        res.render('carrito');
    },
    index: (req,res) => {
        res.render('index');
    },
    login: (req,res) => {
        res.render('login');
    },
    tienda: (req,res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts));
        res.render('tienda', {products});
    },
    register: (req,res) => {
        res.render('register');
    }

}

module.exports = controlador;