import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/profile', {
        name,
        email,
      });
      setMessage('Profile updated successfully');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating profile');
      setMessage('');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/users/change-password', {
        currentPassword,
        newPassword,
      });
      setMessage('Password changed successfully');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error changing password');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {message && (
            <Typography color="primary" align="center" gutterBottom>
              {message}
            </Typography>
          )}
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleUpdateProfile}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update Profile
            </Button>
          </form>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>
          <form onSubmit={handleChangePassword}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              margin="normal"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Profile; 