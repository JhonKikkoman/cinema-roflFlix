import { Pagination, Stack } from '@mui/material';
import React from 'react';

import { movieT } from '../../../models/movie.type';
import MovieCard from '../CustomUiComponent/MovieCard';

interface propT {
  movies: movieT[] | undefined;
  totalPages: number | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function MoviesList({
  movies,
  totalPages,
  page,
  setPage,
}: propT) {
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap" gap={3}>
        {movies?.map(movie => (
          <MovieCard key={movie.kinopoiskId} movie={movie} reload />
        ))}
      </Stack>
      <Pagination
        count={totalPages}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={page}
        sx={{ margin: '0 auto' }}
        onChange={(_, value) => setPage(value)}
      />
    </>
  );
}
