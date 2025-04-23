import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Library Management
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your one-stop solution for managing books and users
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <LibraryBooksIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom color="white">
              Book Management
            </Typography>
            <Typography color="white" align="center">
              Add, update, and manage your book collection with ease
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <PeopleIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom color="white">
              User Management
            </Typography>
            <Typography color="white" align="center">
              Manage user profiles and track book issues
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <BookIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
            <Typography variant="h5" component="h3" gutterBottom color="white">
              Book Tracking
            </Typography>
            <Typography color="white" align="center">
              Keep track of book availability and issue history
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home; 