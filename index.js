const {server} = require("./db/server"); 
const express = require("express");
const cors = require("cors");

//Inicializar app

console.log("App node working");

//Conectar a la base de datos

server(); 

//Crear servidor Node

const app = express(); 
const port = 3900; 

//Configurar Cors 
app.use(cors()); 

//Convertir body a objeto js

app.use(express.json()); 

//Crear rutas

//Crear servidor y escuchar peticiones http

app.listen(port,() => {
    console.log(`Cyberia is running at port:${port}`); 
})
