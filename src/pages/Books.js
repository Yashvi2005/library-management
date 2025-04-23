import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Books() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      copies: 5,
      available: 3,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780446310789',
      copies: 3,
      available: 1,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    copies: '',
  });

  const handleAddBook = () => {
    setSelectedBook(null);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      copies: '',
    });
    setOpenDialog(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      copies: book.copies,
    });
    setOpenDialog(true);
  };

  const handleDeleteBook = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== bookId));
    }
  };

  const handleSaveBook = () => {
    if (selectedBook) {
      // Edit existing book
      setBooks(books.map(book => 
        book.id === selectedBook.id 
          ? { ...book, ...formData, available: formData.copies - (book.copies - book.available) }
          : book
      ));
    } else {
      // Add new book
      const newBook = {
        id: Math.max(...books.map(b => b.id)) + 1,
        ...formData,
        available: formData.copies,
      };
      setBooks([...books, newBook]);
    }
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" color="white">
          Book Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddBook}
          sx={{ background: 'rgba(255, 255, 255, 0.2)' }}
        >
          Add Book
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Title</TableCell>
              <TableCell sx={{ color: 'white' }}>Author</TableCell>
              <TableCell sx={{ color: 'white' }}>ISBN</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Copies</TableCell>
              <TableCell sx={{ color: 'white' }}>Available</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell sx={{ color: 'white' }}>{book.title}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.author}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.isbn}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.copies}</TableCell>
                <TableCell sx={{ color: 'white' }}>{book.available}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: 'white' }} onClick={() => handleEditBook(book)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white' }} onClick={() => handleDeleteBook(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedBook ? 'Edit Book' : 'Add New Book'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            fullWidth
            value={formData.author}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="isbn"
            label="ISBN"
            fullWidth
            value={formData.isbn}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="copies"
            label="Total Copies"
            type="number"
            fullWidth
            value={formData.copies}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveBook}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Books; 