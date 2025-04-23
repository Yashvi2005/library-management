const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Book = require('./models/Book');
require('dotenv').config();

const initializeDb = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'Admin',
      booksIssued: 0
    });

    await adminUser.save();
    console.log('Admin user created');

    // Create sample books
    const books = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        copies: 5,
        available: 5,
        issuedTo: []
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780446310789',
        copies: 3,
        available: 3,
        issuedTo: []
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        copies: 4,
        available: 4,
        issuedTo: []
      }
    ];

    await Book.insertMany(books);
    console.log('Sample books created');

    console.log('Database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDb(); 