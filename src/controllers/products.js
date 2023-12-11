const path = require('path');
const fs = require('fs');

const jsonProducts = path.join(__dirname, '../data/products.json');
const Sequelize = require('sequelize')
const { where } = require('sequelize');

let db = require("../database/models");

const controlador = {
    index: (req, res) => {
        /* const products = JSON.parse(fs.readFileSync(jsonProducts,'utf-8'));
        res.render('tienda', {products}); */
        db.Products.findAll()
            .then(products => {
                res.render('tienda', { productos: products })
            });
    },
    detail: (req, res) => {
        const users = db.Users.findAll();
        db.Products.findByPk(req.params.id)
            .then(product => {
                
                res.render('productDetail', { product })
            });
    },
    create: (req, res) => {
        res.render('productCreate');
    },
    postCreate: (req, res) => {
        let data = req.body;
        console.log(req.body)
        db.Products.create({
            name: data.name,
            preview: data.preview,
            description: data.description,
            image: req.file ? req.file.filename : "default-image.png",
            price: parseInt(data.price),
            category: data.category,
            discount: data.discount
        }).then(() => {
            res.redirect('/tienda');
        });

    },
    edit: (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(productToEdit => {
                res.render('productEdit', { productToEdit: productToEdit });
            });
    },
    processEdit: (req, res) => {
        const data = req.body;
        db.Products.update(
            {
                name: data.name,
                preview: data.preview,
                description: data.description,
                image: req.file ? req.file.filename: data.image,
                price: parseInt(data.price),
                category: data.category,
            },
            {
                where: { id: req.params.id }
            })
            .then(() => {
                res.redirect("/tienda");
            })
    },
    destroy: (req, res) => {
        
        db.Products.destroy({
            where: {id: req.params.id}
        }).then(() =>{
            res.redirect("/tienda");
        })
        
    },
    search: (req, res) => {
        db.Products.findAll({
            where: {
                name: { [Sequelize.Op.like]: `%${req.body.barra}%` }
            }
        }).then((productos) =>{
            console.log(req.body.barra)
           /*  if(req.body.barra == ""){
                res.redirect('/tienda');
            } */
            res.render('tienda', {productos});
        })
    },
}
module.exports = controlador;