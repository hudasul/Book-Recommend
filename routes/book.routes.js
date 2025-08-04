const router = require("express").Router();
const Book = require("../models/Book");
const User = require("../models/User");
const isSignedIn = require("../middleware/isSignedIn")

// All books
router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.render("/books/all-books.ejs", { allBooks });
  } catch (error) {
    console.log(error);
  }
});

// show add book recommendation form
router.get("/new",isSignedIn, (req, res) => {
  try {
    res.render("books/new.ejs");
  } catch (error) {
    console.log(error);
  }
});

// Create new book recommindation
router.post("/new",isSignedIn, async (req, res) => {
  try {
    const createdBook = new Book({
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      price: req.body.price,
      year: req.body.year,
      genre: req.body.genre,
      reason: req.body.reason,
      creator: req.session.user._id,
    });
    await createdBook.save();
    res.redirect("/books");
  } catch (error) {
    console.log(error);
  }
});

// show user own added books
router.get("/myBooks",isSignedIn, async (req, res) => {
  try {
    const userID = req.session.user._id;
    const userBooks = await Book.find({ creator: userID });
    res.render("books/my-books.ejs", { userBooks });
  } catch (error) {
    console.log(error);
  }
});

// display Reading List
router.get("/reading-list",isSignedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("readingList");
    res.render("books/reading-list.ejs", { readingList: user.readingList });
  } catch (error) {
    console.log(error);
  }
});

// Add  books to Reading List
router.post("/:id/reading-list",isSignedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const bookId = req.params.id;
    const user = await User.findById(userId);
    if (!user.readingList.includes(bookId)) {
      user.readingList.push(bookId);
      await user.save();
    }
    res.redirect(`/books/reading-list`);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id/reading-list", isSignedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const bookId = req.params.id;

    const user = await User.findById(userId);
    user.readingList = user.readingList.filter(id => id.toString() !== bookId);
    await user.save();

    res.redirect("/books/reading-list");
  } catch (error) {
    console.log(error);
  }
});

// show Book details
router.get("/:id", async (req, res) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    res.render("books/book-details.ejs", { foundBook });
  } catch (error) {
    console.log(error);
  }
});

// show Update form
router.get("/:id/edit",isSignedIn, async (req, res) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    res.render("books/update.ejs", { foundBook });
  } catch (error) {
    console.log(error);
  }
});

// Update book info
router.put("/:id/edit",isSignedIn, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/books/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

// Delete book
router.delete("/:id/delete",isSignedIn, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (error) {
    console.log(error);
  }
});

// show books by genre
router.get("/genre/:genreName", async (req, res) => {
  try {
    const genre = req.params.genreName;
    const books = await Book.find({ genre });
    res.render("books/genre-books.ejs", { genre, books });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;