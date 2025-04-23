import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Books() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', copies: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      console.log('Fetched books:', response.data);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books');
    }
  };

  const handleAddBook = async () => {
    try {
      setError('');
      setSuccess('');
      
      // Validate input
      if (!newBook.title || !newBook.author || !newBook.isbn || !newBook.copies) {
        setError('All fields are required');
        return;
      }

      // Convert copies to number
      const bookData = {
        ...newBook,
        copies: parseInt(newBook.copies, 10)
      };

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add a book');
        return;
      }

      // Add Authorization header
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      console.log('Adding book:', bookData);
      const response = await axios.post('http://localhost:5000/api/books', bookData, config);
      console.log('Book added successfully:', response.data);
      
      setSuccess('Book added successfully');
      setOpen(false);
      setNewBook({ title: '', author: '', isbn: '', copies: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error.response?.data || error);
      setError(error.response?.data?.message || 'Failed to add book');
    }
  };

  const handleIssueBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`http://localhost:5000/api/books/${bookId}/issue`, {}, config);
      fetchBooks();
    } catch (error) {
      console.error('Error issuing book:', error);
      setError(error.response?.data?.message || 'Failed to issue book');
    }
  };

  const handleReturnBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`http://localhost:5000/api/books/${bookId}/return`, {}, config);
      fetchBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      setError(error.response?.data?.message || 'Failed to return book');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      {user?.role === 'Admin' && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Add Book
        </Button>
      )}
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography color="textSecondary">Author: {book.author}</Typography>
                <Typography color="textSecondary">ISBN: {book.isbn}</Typography>
                <Typography>
                  Available: {book.available} / {book.copies}
                </Typography>
              </CardContent>
              <CardActions>
                {book.available > 0 ? (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleIssueBook(book._id)}
                  >
                    Issue
                  </Button>
                ) : (
                  <Button size="small" disabled>
                    Not Available
                  </Button>
                )}
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleReturnBook(book._id)}
                >
                  Return
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="ISBN"
            value={newBook.isbn}
            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Copies"
            type="number"
            value={newBook.copies}
            onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
            margin="normal"
            required
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddBook} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Books; 