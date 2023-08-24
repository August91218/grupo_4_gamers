const path = require('path');
const fs = require('fs');

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
    register: (req,res) => {
        res.render('register');
    }

}

module.exports = controlador;