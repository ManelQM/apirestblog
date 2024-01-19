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
    
    return res.status(200).json({
        message : "Article created!",
    }) 
}


module.exports = {
    test,
    test2,
    createArticle,
  };