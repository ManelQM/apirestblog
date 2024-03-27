const { validate } = require("../services/validate");
const fs = require("fs");
const path = require("path")
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

// GET ONE SPECIFIC ARTICLE CONTROLLER

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

// UPLOAD IMAGE CONTROLLER

const uploadImage = async (req, res) => {
  // Configurar Multer en articleRouter.js

  // Recoger el fichero de imagen subido
  if (!req.file) {
    return res.status(404).json({
      status: "error",
      message: "Please, choose a file to upload your image",
    });
  }
  // Nombre del archivo

  let fileName = req.file.originalname;

  // Extensión del archivo

  let fileNameSplit = fileName.split(".");
  // Comprobar extension correcta
  let fileExtension = fileNameSplit[1];
  // Actualizar
  if (
    fileExtension != "png" &&
    fileExtension != "jpg" &&
    fileExtension != "jpeg" &&
    fileExtension != "gift"
  ) {
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        message: "Invalid file format",
      });
    });
  } else {
    // Devolver respuesta a través de un else ya que si lo pusiera simplemente detras del if node devuelve error.

    let id = req.params.id;

    try {
      const updatedArticle = await Article.findOneAndUpdate(
        { _id: id },
        { img: req.file.filename },
        { new: true }
      );

      if (!updatedArticle) {
        return res.status(404).json({
          status: "error",
          messasge: "Cant find the article",
        });
      }
      // Response del artículo actualizado 
      return res.status(200).json({
        status: "success",
        article: updatedArticle,
        files: req.file,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Internal Server Error, cant update article image",
      });
    }
  }
};

// GET ONE IMAGE AND SHOW CONTROLLER

const getOneImg = async (req,res) => {

  try {

    let file = req.params.img
    // console.log(req.params, "la request por params")

    let fileRoute = "./imagenes/articulos/" + file; 
    // console.log(fileRoute, "fileROute")
    fs.stat(fileRoute, (error,existe) => {
      if(existe) {
        return res.sendFile(path.resolve(fileRoute)) // sendFile es un metodo de node para enviar archivos dentro del fs, necesitamos importar libreria PATH
      } else {
        return res.status(404).json({
          status: "error",
          message: "File dont exists or its not uploaded",
          existe,
          file,
          fileRoute, 
        })
      }
    })

  } catch(error) {

    return res.status(400).json({
      status: "error",
      message: "Internal Server Error"
    })
  }

}

// SEARCH CONTROLLER 

const search = async (req, res) => {
  try {
    // Sacar el string de búsqueda
    let searchString = req.params.search;

    // Find OR
    const findedArticles = await Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    }).sort({ date: -1 });

    if (!findedArticles || findedArticles.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Can't find any articles",
      });
    }
    // Devolver resultado
    return res.status(200).json({
      status: "success",
      articles: findedArticles,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
 
module.exports = {
  test,
  test2,
  createArticle,
  getAllArticles,
  getOneArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
  getOneImg,
  search, 
};
