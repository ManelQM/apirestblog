const validator = require("validator");
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

//CREATE ARTICLE

const createArticle = async (req, res) => {
 
  // RECOGER PARAMETROS POR BODY
  let newArticleParams = req.body;

  // VALIDAR DATOS
  try {
    let validateTitle =
      !validator.isEmpty(newArticleParams.title) &&
      validator.isLength(newArticleParams.title, { min: 5, max: undefined });
    let validateContent = !validator.isEmpty(newArticleParams.content);

    if (!validateTitle || !validateContent) {
      throw new Error("Please try again, article not validated!!");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Please complete the required fields",
    });
  }

  // CREAR OBJETO
  const article = new Article(newArticleParams);

  // GUARDAR EN BD
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

// GET ALL ARTICLES

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

// GET ONLY ONE SPECIFIC ARTICLE

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

const deleteArticle = async (req,res) => {

  try {
    
    let toDelete = req.params.id; 
    const deleteArticle = await Article.findOneAndDelete(toDelete);

    if(!deleteArticle) {

      return res.status(404).json({
        status: "error",
        message: "Cant find the article", 
      })
    }

    return res.status(200).json({
      status: "success",
      deleteArticle,
      message: "Article deleted"
    })

  } catch(error) {

    return res.status(500).json({
      status: "error",
      message: "Internal server error", 
    })

  }
}

module.exports = {
  test,
  test2,
  createArticle,
  getAllArticles,
  getOneArticle,
  deleteArticle, 
};
