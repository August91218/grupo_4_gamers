let express=require("express");
let app=express();
let path=require("path");

const mainRouter = require('./routes/mainRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE


app.listen("3000", function () {
    console.log("Servidor corriendo")
});

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false })); // Para poder interpretar lo que llega desde el body
app.use(express.json()); // Para poder interpretar lo que llega desde el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE


app.set('view engine', 'ejs');
app.set('views', './src/views')

app.get('/', mainRouter);

app.get('/tienda', productsRouter);
app.get('/tienda/detail/:id', productsRouter);
app.get('/tienda/vender/', productsRouter);
app.post('/tienda/vender/', productsRouter);

app.get('/login', mainRouter);
app.get('/register', mainRouter);
app.get('/carrito', mainRouter);



//Para la funcion de tienda y carrito donde los productos comprados se manden al carrito donde podran ser vistos//
if (typeof document !== 'undefined') {
    const header = document.querySelector("header");
    const contenedor = document.querySelector("#contenedor");
    const body = document.querySelector("body");
    window.addEventListener("scroll",function(){
        if(contenedor.getBoundingClientRect().top<10){
            header.classList.add("scroll")
        }
        else{
            header.classList.remove("scroll")
        }
    })
}

