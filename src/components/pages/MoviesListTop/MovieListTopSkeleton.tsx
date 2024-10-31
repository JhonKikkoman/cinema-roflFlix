import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MovieListTopSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box mt={2} mb={2}>
      {new Array(5).fill(null).map((_, index) => (
        <Box key={index}>
          <Skeleton
            animation="wave"
            variant="text"
            height="20px"
            width="150px"
            sx={{ mb: 1 }}
          />
          <Stack direction="row" justifyContent="center" flexWrap="wrap">
            {new Array(5).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                animation="wave"
                variant="rectangular"
                height={isMobile ? '420px' : '325px'}
                width={isMobile ? '100%' : '210px'}
                sx={{ mr: '1px' }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
