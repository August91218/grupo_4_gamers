const path = require('path');
const fs = require('fs');

const jsonProducts = path.join(__dirname, '../data/products.json');

const controlador = {
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts,'utf-8'));
        res.render('tienda', {products});
    },
    detail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts,'utf-8'));
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

        const products = JSON.parse(fs.readFileSync(jsonProducts,'utf-8'));

        let newProduct = {
            id: products[products.length - 1].id + 1,
            name: data.name, 
            preview: data.preview,
            description: data.description,
            image: req.file ? req.file.filename : "default-image.png",
            price: parseInt(data.price),
            category: data.category 
        }
        products.push(newProduct);
        
        fs.writeFileSync(jsonProducts, JSON.stringify(products));

        res.redirect('/tienda');
    },
    edit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts,'utf-8'));
        const productToEdit = products.find(products => {
            return products.id == req.params.id
        });
        res.render('productEdit', {productToEdit: productToEdit});
    },
    processEdit: (req, res) => {
        const data = req.body;
		const products = JSON.parse(fs.readFileSync(jsonProducts, 'utf-8'));
        
        //Producto antiguo
		const oldProduct = products.find(products => {
            return products.id == req.params.id
        });

        //Encontrar Index del producto
        const index = products.findIndex(products => {
			return products.id == req.params.id
		});

		// Crear un nuevo objeto literal con los datos ingresados por el usuario
		const productoEditado = {
            id: oldProduct.id,
			name: data.name,
            preview: data.preview,
            description: data.description,
            image: req.file ? req.file.filename : oldProduct.image,
			price: parseInt(data.price),
			category: data.category,
		};
		products[index] = productoEditado;
		fs.writeFileSync(jsonProducts, JSON.stringify(products, null, " "))
		res.redirect("/tienda");
	},
    destroy: (req,res) => {
        const products = JSON.parse(fs.readFileSync(jsonProducts, 'utf-8'));

		// Modificar el array para que se elimine el producto con ID que llega por parametro
		const filteredProducts = products.filter(product => {
			return product.id != req.params.id
		})

		// Escribir el archivo JSON
		fs.writeFileSync(jsonProducts, JSON.stringify(filteredProducts, null, " "))

		// Devolverle alguna vista al usuario
		res.redirect("/tienda");
    }
}
module.exports = controlador;