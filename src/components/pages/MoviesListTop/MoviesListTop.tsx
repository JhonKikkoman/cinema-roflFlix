import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../../constant';
import { useGetTopFilmsQuery } from '../../../services/kinopoisk.api';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import MoviesListTopSkeleton from './MovieListTopSkeleton';

export default function MoviesListTop() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [location]);

  const movieQuery = TOP_LISTS.find(el => el.url === location.pathname);

  const { data, isLoading, error } = useGetTopFilmsQuery({
    type: movieQuery === undefined ? '' : movieQuery.query,
    page,
  });
  if (error) return <ErrorMessage />;
  if (isLoading) return <MoviesListTopSkeleton />;
  return (
    <>
      <Stack flexDirection="row" mt={2} mb={2}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieQuery?.title}</Typography>
      </Stack>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
