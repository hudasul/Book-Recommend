const router = require("express").Router()
const Book = require("../models/Book")
const User = require("../models/User")

// all books dsplayed , home page
router.get("/",async (req,res)=>{
    try{
        const allBooks = await Book.find()
        res.render("books/all-Books.ejs",{allBooks:allBooks})


    }catch(error){
        console.log(error)
    }
})

// form to add a book
router.get("/new", (req,res)=>{
    try{
        res.render("books/new.ejs")


    }catch(error){
        console.log(error)
    }
})

// create a new book
router.post("/new" ,async (req,res)=>{
    try{
        const createdBook = await Book.create(req.body)
        res.redirect("/books")
        
        


    }catch(error){
        console.log(error)
    }
})

// display book details
router.get("/:id",async (req,res)=>{
    try{
       const foundBook = await Book.findById(req.params.id)
       res.render("books/book-details.ejs", {foundBook: foundBook})

    }catch(error){
        console.log(error)
    }
})

router.get("/:id/edit", async (req,res)=>{
    try{
        const foundBook = await Book.findById(req.params.id)
        res.render("books/update.ejs", {foundBook: foundBook})
    }catch(error){
        console.log(error)
    }
    
})

router.put("/:id/edit", async (req,res)=>{
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/books/${req.params.id}`)
    }catch(error){
        console.log(error)
    }
    
})


module.exports = router