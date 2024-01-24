const validator = require("validator");

const validate = async (res, update, newArticleParams) => {
    let validateTitle =
      (!validator.isEmpty(update.title) &&
        validator.isLength(update.title, { min: 5, max: undefined })) ||
      (!validator.isEmpty(newArticleParams.title) &&
        validator.isLength(newArticleParams.title, { min: 5, max: undefined }));
  
    let validateContent =
      !validator.isEmpty(update.content) ||
      !validator.isEmpty(newArticleParams.content);
  
    if (!validateTitle || !validateContent) {
      throw new Error("Please try again, article not validated!!");
    }
  };
  
  module.exports = {
    validate,
  }