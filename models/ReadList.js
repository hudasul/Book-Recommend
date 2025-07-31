const mongoose = require("mongoose")

const readSchema = new mongoose.Schema({
    creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    toReadBook :{
        type: mongoose.Schema.Types.ObjectId,
            ref:"Book"
    }    
  
})

const ReadList = mongoose.model("ReadList",readSchema)

module.exports = ReadList