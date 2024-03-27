const {Schema, model} = require("mongoose"); 

//DEFINIMOS COMO QUEREMOS QUE SEA NUESTRO MODELO Y QUE DATOS VA A CONTENER

const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now // Por defecto cuando guarde un objeto en la bd le dará por la fecha del mismo día y hora. 
                          // Esto se puede ver en la documentación buscando mongoose types  
    },
    img: {
        type: String,
        default: "default.png" // En el caso de que no llegara la img aparecería default.png
    }, 
})


module.exports = model("Article", ArticleSchema); // exportamos el nombre del modelo y luego le indicamos que esquema utiliza el modelo
                                                  // que es lo que hemos hecho arriba. Mongoose pluraliza todos los nombres de los modelos por lo que en la bd será articles.   