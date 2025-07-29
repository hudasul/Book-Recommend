const router = require("express").Router()
const Book = require("../models/Book")

router.get("/",async (req,res)=>{
    try{
        const allBooks = await Book.find()
        res.render("books/all-Books.ejs",{allBooks:allBooks})


    }catch(error){
        console.log(error)
    }
})
router.get("/new", (req,res)=>{
    try{
        res.redirect("/books")


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