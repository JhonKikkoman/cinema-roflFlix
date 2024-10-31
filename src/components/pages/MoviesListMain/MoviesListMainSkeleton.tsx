import { Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Skeleton animation="wave" variant="text" height="45px" width="150px" />
      <Stack
        sx={{ flexDirection: { sm: 'column', md: 'row' } }}
        gap={1}
        mt={1}
        mb={1}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton animation="wave" variant="rounded" width={132} height={40} />
      </Stack>

      <Stack flexDirection="row" mt={2} mb={2}></Stack>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={1}>
        {new Array(15).fill(null).map((_, index) => (
          <Stack key={index} alignItems="center">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="325px"
              width="215px"
            />
            <Skeleton animation="wave" variant="text" width="120px" />
            <Skeleton animation="wave" variant="text" width="120px" />
          </Stack>
        ))}
      </Stack>
    </>
  );
}
