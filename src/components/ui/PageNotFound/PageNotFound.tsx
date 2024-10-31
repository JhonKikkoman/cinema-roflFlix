import DirectionsIcon from '@mui/icons-material/Directions';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import React from 'react';

export default function PageNotFound() {
  const isMobile = useMediaQuery('(max-width:460px)');
  return (
    <Box
      mt={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems="center"
      >
        <Typography variant="h4" textAlign="center">
          Ошибка, такого пути не существует!
        </Typography>
        <ReportGmailerrorredIcon fontSize="large" sx={{ color: '#ff6868' }} />
      </Box>
      <Box display="flex" flexDirection="row">
        <Link
          href="/"
          sx={{ textDecoration: 'none' }}
          display="flex"
          flexDirection="row"
        >
          <DirectionsIcon />
          <Typography variant="h6">Перейти на главную.</Typography>
        </Link>
      </Box>
    </Box>
  );
}
