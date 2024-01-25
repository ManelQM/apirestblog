// CREAMOS LA RUTA CON EXPRESS QUE ES PARA LO QUE UTILIZAMOS ESTE FRAMEWORK
// const {Router} = require("express");
// ESTO SERIA IGUAL A ESTO

const express = require("express");
const router = express.Router();
const multer = require("multer"); // MIDDLEWARE 
const ArticleController = require("../controllers/ArticleController"); // Cargamos controlador

const imageStorage = multer.diskStorage({  // Configuramos Multer

    // Dos metodos de multer 
    // con cb indicamos donde está el directorio

    destination: function (req, file, cb){

        cb(null, "./imagenes/articulos");

    },
    filename: function (req, file, cb) {

        cb(null, "articulo" + Date.now() + file.originalname);

    }
})

const uploads = multer({storage: imageStorage}); 



// Demo Routes

router.get("/demoroute", ArticleController.test);
router.get("/demoroute2", ArticleController.test2);

//Real Deal Routes

router.post("/createarticle", ArticleController.createArticle);
router.get("/allarticles", ArticleController.getAllArticles);
router.get("/onearticle/:id", ArticleController.getOneArticle);
router.delete("/deletearticle/:id", ArticleController.deleteArticle);
router.put("/updatearticle/:id", ArticleController.updateArticle);
router.post("/uploadimage/:id", [uploads.single("file0")],ArticleController.uploadImage); //Single es el método para subir un único archivo
router.get("/getoneimage/:img",ArticleController.getOneImg); 



module.exports = router;
