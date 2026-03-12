
const Book = require("../models/Book");

const createBook = async (req, res, next) => {
  try {
    console.log("[BOOK] Create book request received");
    const book = await Book.create(req.body);
    console.log(`[BOOK] Book created: ${book._id}`);
    res.status(201).json(book);
  } catch (error) {
    console.error("[BOOK] Create book error:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({ message: "A book with this ISBN already exists" });
    }
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    console.log("[BOOK] Fetch all books request received");
    const books = await Book.find();
    console.log(`[BOOK] Returning ${books.length} book(s)`);
    res.status(200).json(books);
  } catch (error) {
    console.error("[BOOK] Fetch all books error:", error.message);
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    console.log(`[BOOK] Fetch book by ID request received: ${req.params.id}`);
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("[BOOK] Fetch book by ID error:", error.message);
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    console.log(`[BOOK] Update book request received: ${req.params.id}`);
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(`[BOOK] Book updated: ${book._id}`);
    res.status(200).json(book);
  } catch (error) {
    console.error("[BOOK] Update book error:", error.message);
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    console.log(`[BOOK] Delete book request received: ${req.params.id}`);
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(`[BOOK] Book deleted: ${req.params.id}`);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("[BOOK] Delete book error:", error.message);
    next(error);
  }
};

const searchBooksByTitle = async (req, res, next) => {
  try {
    const { title, author } = req.query;
    console.log(`[BOOK] Search books request received. title=${title || ""} author=${author || ""}`);

    if (!title && !author) {
      return res.status(400).json({ message: "Provide at least a title or author query parameter" });
    }

    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (author) query.author = { $regex: author, $options: "i" };

    const books = await Book.find(query);
    console.log(`[BOOK] Search returned ${books.length} result(s)`);
    res.status(200).json(books);
  } catch (error) {
    console.error("[BOOK] Search books error:", error.message);
    next(error);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooksByTitle,
};
