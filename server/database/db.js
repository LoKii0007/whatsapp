const mongoose = require("mongoose")

const Connection = async () =>{
    const url = `mongodb+srv://destro:aT6XBJqfaN2XoFum@cluster0.7nytowa.mongodb.net/user?retryWrites=true&w=majority` 
    try{
        await mongoose.connect(url)
        console.log("connected to database successfully")
    }catch(error){
        console.log("error connecting to mongoose", error.message)
    }
}

module.exports = Connection