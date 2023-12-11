const express = require("express");
const session = require("express-session");
const cookie =  require("cookie-parser");
let app = express();

const mainRouter = require('./routes/mainRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE

const userLoggedMdw = require('./middlewares/userLoggedMdw.js');


app.use(session({
    secret: 'Secret...',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookie());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false })); // Para poder interpretar lo que llega desde el body
app.use(express.json()); // Para poder interpretar lo que llega desde el body
app.use(methodOverride('_method')); // Para poder usar los métodos PUT y DELETE
app.use(userLoggedMdw);



app.set('view engine', 'ejs');
app.set('views', './src/views')

app.use(mainRouter);
app.use('/tienda',productsRouter);
app.use('/', usersRouter)

app.listen("3000", () => console.log("Servidor corriendo"));

