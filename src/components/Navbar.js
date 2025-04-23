import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <LibraryBooksIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Library Management
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/books"
              sx={{ mx: 1 }}
            >
              Books
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/users"
              sx={{ mx: 1 }}
            >
              Users
            </Button>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ mx: 1 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 