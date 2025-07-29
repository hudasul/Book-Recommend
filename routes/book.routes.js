const router = require("express").Router()
const Book = require("../models/Book")

router.get("/new", (req,res)=>{
    try{
        res.render("books/new.ejs")


    }catch(error){
        console.log(error)
    }
})

router.post("/new", async (req,res)=>{
    try{
        const createdBook = await Book.create(req.body)
        res.render("books/book-details.ejs",{createdBook: createdBook})


    }catch(error){
        console.log(error)
    }
})




module.exports = router