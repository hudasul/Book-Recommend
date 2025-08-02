const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

const Book = mongoose.model("Book", bookSchema)

module.exports = Book