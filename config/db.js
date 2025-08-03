const mongoose = require("mongoose")
async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    }
    catch(error){
        console.log("Error Occured",error)
    }
}


module.exports = conntectToDB