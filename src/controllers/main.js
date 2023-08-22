const path = require('path');

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
        res.render('tienda');
    },
    register: (req,res) => {
        res.render('register');
    }

}

module.exports = controlador;