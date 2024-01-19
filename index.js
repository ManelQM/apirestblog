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

app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true}));


// REAL DEAL ROUTES

const articleRouter = require("./routes/articleRouter"); 

// ROUTES 

app.use("/blog", articleRouter); 

//HARDCODED ROUTES

// app.get("/probando", (req,res) => {
    
//     console.log("Se ha ejecutado el endpoint de prueba"); 

//     return res.status(200).send ({
//         curso: "Apirestnode",
//         estudiante: "Manel",
//         email: "manel@fakemail.com",
//     });
// });

//Crear servidor y escuchar peticiones http

app.listen(port,() => {
    console.log(`Cyberia is running at port:${port}`); 
})
