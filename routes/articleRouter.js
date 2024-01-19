// CREAMOS LA RUTA CON EXPRESS QUE ES PARA LO QUE UTILIZAMOS ESTE FRAMEWORK
// const {Router} = require("express"); 
// ESTO SERIA IGUAL A ESTO

const express = require("express"); 
const router = express.Router(); 


// Cargamos controlador 

const ArticleController = require("../controllers/ArticleController");

// Demo Routes

router.get("/demoroute", ArticleController.test);
router.get("/demoroute2", ArticleController.test2);

//Real Deal Routes 

router.post("/createArticle", ArticleController.createArticle); 

module.exports = router; 