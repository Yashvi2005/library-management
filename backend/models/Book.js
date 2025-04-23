const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  copies: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Number,
    required: true,
    min: 0,
  },
  issuedTo: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    issueDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema); 