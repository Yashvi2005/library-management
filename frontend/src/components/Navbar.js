import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Library System
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/books">
                Books
              </Button>
              <Button color="inherit" component={RouterLink} to="/profile">
                Profile
              </Button>
              {user?.role === 'Admin' && (
                <Button color="inherit" component={RouterLink} to="/admin">
                  Admin
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 