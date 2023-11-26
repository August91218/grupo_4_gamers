const path = require('path');

const controlador = {
    carrito: (req,res) =>{
        res.render('carrito');
    },
    index: (req,res) => {
        res.render('index');
    }
}

module.exports = controlador;