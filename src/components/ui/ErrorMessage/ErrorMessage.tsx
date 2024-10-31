import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ErrorMessage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h5" textAlign="center" mr={1}>
          Some error happend, try reload page or go on main!
        </Typography>
        <ErrorOutlineIcon fontSize="large" color="info" />
      </Box>
    </Box>
  );
}
