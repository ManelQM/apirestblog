const { validate } = require("../services/validate");
const Article = require("../models/Article");

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

//CREATE ARTICLE CONTROLLER

const createArticle = async (req, res) => {
  // Body params
  let newArticleParams = req.body;

  // Validate data
  try {
    validate(res, newArticleParams);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Please complete the required fields",
    });
  }

  // Create object
  const article = new Article(newArticleParams);

  // Save in Data Base
  try {
    const savedArticle = await article.save();

    return res.status(200).json({
      status: "success",
      article: savedArticle,
      message: "Article created and saved",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Can't save the article",
    });
  }
};

// GET ALL ARTICLES CONTROLLER

const getAllArticles = async (req, res) => {
  try {
    let allArticles = await Article.find({}).exec();

    if (!allArticles || allArticles.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Can't find articles",
      });
    }

    return res.status(200).json({
      status: "success",
      articles: allArticles,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// GET ONLY ONE SPECIFIC ARTICLE CONTROLLER

const getOneArticle = async (req, res) => {
  try {
    let id = req.params.id;

    const oneArticle = await Article.findById(id);

    if (!oneArticle) {
      return res.status(404).json({
        status: "error",
        message: "Cant find the article",
      });
    }

    return res.status(200).json({
      status: "success",
      oneArticle,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// DELETE ARTICLE CONTROLLER

const deleteArticle = async (req, res) => {
  try {
    let id = req.params.id;
    const deleteArticle = await Article.findOneAndDelete(id);

    if (!deleteArticle) {
      return res.status(404).json({
        status: "error",
        message: "Cant find the article",
      });
    }

    return res.status(200).json({
      status: "success",
      deleteArticle,
      message: "Article deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// UPDATE ARTICLE CONTROLLER

const updateArticle = async (req, res) => {
  let id = req.params.id;
  let update = req.body;

  // Validate

  try {
    validate(res, update);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Please complete the required fields",
    });
  }

  // Search and update article
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id },
      update,
      { new: true } // THIS OPTION RETURNS THE MODIFIED DOCUMENT RATHER THAN THE ORIGINAL BEFORE UPDATING!!!!
    );

    if (!updatedArticle) {
      return res.status(404).json({
        status: "error",
        message: "Can't find the article",
      });
    }

    return res.status(200).json({
      status: "success",
      article: updatedArticle,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const uploadImage = (req,res) => {

// Configurar Multer

// Recoger el fichero de imagen subido 

// Nombre del archivo

// Extensión del archivo

// Comprobar extension correcta 

// Actualizar 

// Devolver respuesta 

}

module.exports = {
  test,
  test2,
  createArticle,
  getAllArticles,
  getOneArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
};
