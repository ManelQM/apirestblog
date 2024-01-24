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

router.post("/createarticle", ArticleController.createArticle); 
router.get("/allarticles",ArticleController.getAllArticles);
router.get("/onearticle/:id",ArticleController.getOneArticle);
router.delete("/deletearticle/:id",ArticleController.deleteArticle);
router.put("/updatearticle/:id",ArticleController.updateArticle); 

module.exports = router; 