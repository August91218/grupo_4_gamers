let express=require("express");
let app=express();
let path=require("path");
app.listen("3000", function () {
    console.log("Servidor corriendo")
});
app.use(express.static("public"))
app.get("/",function (req,res) {

    res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get("/login",function (req,res) {

    res.sendFile(path.join(__dirname,"/views/login.html"))
})
app.get("/register",function (req,res) {

    res.sendFile(path.join(__dirname,"/views/register.html"))
})
app.get("/carrito",function (req,res) {

    res.sendFile(path.join(__dirname,"/views/carrito.html"))
})
app.get("/tienda",function (req,res) {

    res.sendFile(path.join(__dirname,"/views/Tienda.html"))
})


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

