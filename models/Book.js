const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
           type:String,
           required:true
    },

    author:String,

    rating:{
        type:Number,
        min:0,
        max:5
    },
    price: Number,
    year: Number,
    genre: String,
    reason: String,
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book