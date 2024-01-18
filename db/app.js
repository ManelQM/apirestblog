const mongoose = require("mongoose"); 
const app =  async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/my_blog");
        console.log("Welcome to the database, have fun!")
    }catch(error) {
        console.log(error);
        throw new Error("Cant connect to the database"); 
    }
} 

module.exports = {
    app
}; 