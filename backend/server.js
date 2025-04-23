const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const User = require('./models/User');
const Book = require('./models/Book');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/library_db';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(async () => {
    console.log('Connected to MongoDB successfully');
    // Check if test user exists before creating
    const existingUser = await User.findOne({ email: 'test@test.com' });
    if (!existingUser) {
      const testUser = new User({
        name: 'Test User',
        email: 'test@test.com',
        password: 'test123',
        role: 'Admin'
      });
      await testUser.save();
      console.log('Test user created successfully');
    } else {
      console.log('Test user already exists');
    }

    // Check if test books exist
    const existingBooks = await Book.find();
    if (existingBooks.length === 0) {
      const testBooks = [
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          isbn: '9780743273565',
          copies: 5,
          available: 5
        },
        {
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          isbn: '9780061120084',
          copies: 3,
          available: 3
        },
        {
          title: '1984',
          author: 'George Orwell',
          isbn: '9780451524935',
          copies: 4,
          available: 4
        }
      ];

      await Book.insertMany(testBooks);
      console.log('Test books created successfully');
    } else {
      console.log('Test books already exist');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', err.message);
    console.error('Stack trace:', err.stack);
  });

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find();
    res.json({ message: 'Database test successful', users, books });
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 