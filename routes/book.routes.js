const router = require("express").Router()
const Book = require("../models/Book")
const User = require("../models/User")


// all books dsplayed , home page
router.get("/",async (req,res)=>{
    try{
        const userID = req.session.user._id
        const allBooks = await Book.find()
        res.render("books/all-Books.ejs",{allBooks, userID})


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
        
        const createdBook = new Book({
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            price:req.body.price,
            year: req.body.year,
            genre: req.body.genre,
            reason: req.body.reason,
            creator: req.session.user._id
        })
        await createdBook.save()
        res.redirect("/books")
        
        


    }catch(error){
        console.log(error)
    }
})


router.get("/myBooks", async (req,res)=>{
    try{
      const userID = req.session.user._id
      const userBooks = await Book.find({creator: userID})  
      res.render("books/my-books.ejs", {userBooks})

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

// show epdate form
router.get("/:id/edit", async (req,res)=>{
    try{
        const foundBook = await Book.findById(req.params.id)
        res.render("books/update.ejs", {foundBook: foundBook})
    }catch(error){
        console.log(error)
    }
    
})

// update the book-rocommendation information
router.put("/:id/edit", async (req,res)=>{
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/books/${req.params.id}`)
    }catch(error){
        console.log(error)
    }
    
})

// deletes a book recommendation
router.delete("/:id/delete", async (req,res)=>{
    try{
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        res.redirect("/books")
    }catch(error){
        console.log(error)
    }
    
})

router.get("/genre/:genreName",async (req,res)=>{
    try{

        const genre = req.params.genreName
        const books = await Book.find({genre: genre})
        res.render("books/genre-books.ejs", {genre, books})
    }catch(error){
        console.log(error)

    }
})

router.get('/reading-list', async (req, res) => {
  try {
    const userId = req.session.user?._id;
    const readingList = await User.findById(userId).populate('readingList');
    res.render('books/reading-list.ejs',{readingList});
  } catch (err) {
    console.error(err);
  }
});

router.post('/:id/reading-list', async (req, res) => {
  try {
    const userId = req.session.user?._id;
    
    const bookId = req.params.id;
    const user = await User.findById(userId);

    // Avoid duplicate entries
    if (!user.readingList.includes(bookId)) {
      user.readingList.push(bookId);
      await user.save();
    }

     res.redirect("/books")
  } catch (err) {
    console.error(err);
  }
})








module.exports = router