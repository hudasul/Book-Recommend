const router = require("express").Router()
const Book = require("../models/Book")

router.get("/new", (req,res)=>{
    try{
        res.render("books/new.ejs")


    }catch(error){
        console.log(error)
    }
})


module.exports = router