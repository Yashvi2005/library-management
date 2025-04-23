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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Student',
      booksIssued: 2,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Faculty',
      booksIssued: 1,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Student',
    booksIssued: 0,
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Student',
      booksIssued: 0,
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      booksIssued: user.booksIssued,
    });
    setOpenDialog(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
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
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ background: 'rgba(255, 255, 255, 0.2)' }}
        >
          Add User
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Email</TableCell>
              <TableCell sx={{ color: 'white' }}>Role</TableCell>
              <TableCell sx={{ color: 'white' }}>Books Issued</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
                <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>{user.booksIssued}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: 'white' }} onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white' }} onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              label="Role"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Faculty">Faculty</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="booksIssued"
            label="Books Issued"
            type="number"
            fullWidth
            value={formData.booksIssued}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Users; 