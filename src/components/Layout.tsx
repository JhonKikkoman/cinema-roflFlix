import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './ui/Footer';
import NavBar from './ui/NavBar';

export default function Layout() {
  return (
    <Container
      fixed
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Box sx={{ p: 4 }} />
      <NavBar />
      <Outlet />
      <Footer />
    </Container>
  );
}
