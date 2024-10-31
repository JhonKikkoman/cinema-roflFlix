import DownloadingIcon from '@mui/icons-material/Downloading';
import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function LoadingSpinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      margin="auto"
      position="relative"
    >
      <CircularProgress color="inherit" size={100} value={30} thickness={1.2} />
      <DownloadingIcon
        color="inherit"
        sx={{
          fontSize: '2rem',
          position: 'absolute',
          top: '32%',
        }}
      />
    </Box>
  );
}
