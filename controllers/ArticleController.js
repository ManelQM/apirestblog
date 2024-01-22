const validator = require("validator"); 

//TEST CONTROLLERS 

const test = (req, res) => {
  return res.status(200).json({
    mensaje: "Esto es un mensaje de prueba",
  });
};



const test2 = (req, res) => {
  return res.status(200).json({
    curso: "Apirestnode",
    estudiante: "Manel",
    email: "manel@fakemail.com",
  });
};

//REAL CONTROLLERS 

const createArticle = (req, res) => {

    //RECOGER PARAMETROS POR POST 
    let newArticleParams = req.body;
    
    //VALIDAR DATOS
    try{
        let validateTitle = !validator.isEmpty(newArticleParams.title) && 
                             validator.isLength(newArticleParams.title, {min: 5, max: undefined});
        let validateContent = !validator.isEmpty(newArticleParams.content);
        
        if(!validateTitle || !validateContent) {
            throw new Error("Please try again, article not validated!!"); 
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Please complete the required fields",
        })

    }; 
    
    return res.status(200).json({
        message : "Article created!",
    }) 
}


module.exports = {
    test,
    test2,
    createArticle,
  };