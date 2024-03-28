const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = async () => {
  //     try{
  //         await mongoose.connect("mongodb://localhost:27017/my_blog");
  //         console.log("Welcome to the database, have fun!")
  //     }catch(error) {
  //         console.log(error);
  //         throw new Error("Cant connect to the database");
  //     }
  // }

  try {
    dotenv.config();
    const { DB_USER, DB_PASS, DB_NAME } = process.env;
    const connectionString = `mongodb://${DB_USER}:${DB_PASS}@apirestblog-production-3622.up.railway.app:27017/${DB_NAME}`;

    // await mongoose.set(connectionString, "useNewUrlParser", true , "useFindAndModify", false);
    await mongoose.connect(connectionString, {
      // useNewUrlParser: true,
      // useFindAndModify: false
    });
    console.log("Welcome to the database, have fun!");
    
  } catch (error) {
    console.log(error);
    throw new Error("Cant connect to the database");
  }
};

module.exports = {
  server,
};
