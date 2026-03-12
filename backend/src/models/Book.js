const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: String,
      required: true,
      trim: true,
    },
    publicationYear: {
      type: Number,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: [1, "Total copies must be a positive number"],
    },
    availableCopies: {
      type: Number,
      default: 0,
      min: [0, "Available copies cannot be negative"],
    },
    shelfLocation: {
      type: String,
      trim: true,
    },
    bookType: {
      type: String,
      enum: ["Reference", "Circulating"],
      default: "Circulating",
    },
    status: {
      type: String,
      enum: ["Available", "Checked Out"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
