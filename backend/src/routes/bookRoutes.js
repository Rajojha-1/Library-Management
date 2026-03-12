const express = require("express");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooksByTitle,
} = require("../controllers/bookController");

const router = express.Router();

console.log("[ROUTES] Book routes initialized under /api/books");

router.post("/books", createBook);
router.get("/books", getAllBooks);
router.get("/books/search", searchBooksByTitle);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
