const mongoose = require("mongoose"); 
const server  =  async() => {
    try{
        await mongoose.connect("mongodb://apirestblog-production-3622.up.railway.app");
        console.log("Welcome to the database, have fun!")
    }catch(error) {
        console.log(error);
        throw new Error("Cant connect to the database"); 
    }
} 

module.exports = {
    server
}; 