const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

// Get all books - public route
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('issuedTo.user', 'name email');
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get book by ID - public route
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('issuedTo.user', 'name email');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new book (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, author, isbn, copies } = req.body;
    const book = new Book({
      title,
      author,
      isbn,
      copies,
      available: copies,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { title, author, isbn, copies } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    
    if (copies !== undefined) {
      const diff = copies - book.copies;
      book.copies = copies;
      book.available += diff;
    }

    await book.save();
    res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete book (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.deleteOne({ _id: req.params.id });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Issue book
router.post('/:id/issue', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.available <= 0) {
      return res.status(400).json({ message: 'No copies available' });
    }

    if (req.user.booksIssued >= 3) {
      return res.status(400).json({ message: 'Maximum books already issued' });
    }

    book.available -= 1;
    book.issuedTo.push({
      user: req.user._id,
      issueDate: new Date(),
    });

    req.user.booksIssued += 1;
    await Promise.all([book.save(), req.user.save()]);

    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Return book
router.post('/:id/return', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const issuedBook = book.issuedTo.find(
      (issue) => issue.user.toString() === req.user._id.toString() && !issue.returnDate
    );

    if (!issuedBook) {
      return res.status(400).json({ message: 'Book not issued to this user' });
    }

    issuedBook.returnDate = new Date();
    book.available += 1;
    req.user.booksIssued -= 1;

    await Promise.all([book.save(), req.user.save()]);
    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 