const validator = require("validator");

const validate = async (res, update) => {
    let validateTitle =
      !validator.isEmpty(update.title) &&
      validator.isLength(update.title, { min: 5, max: undefined });
    let validateContent = !validator.isEmpty(update.content);
  
    if (!validateTitle || !validateContent) {
      throw new Error("Please try again, article not validated!!");
    }
  };

  module.exports = {
    validate,
  }