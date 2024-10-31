import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { MOVIE_LIST } from '../../../constant';
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from '../../../services/kinopoisk.api';
import { RootState } from '../../../store/store';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import SelectMovies from '../../ui/SelectMovies';
import MoviesListMainSkeleton from './MoviesListMainSkeleton';

export default function MoviesListTop() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { countries, order, year, genreId } = useSelector(
    (state: RootState) => state.currentQuerySlice,
  );

  const movieQuery = MOVIE_LIST.find(el => el.url === location.pathname);
  const responseFilms = useGetFilmsQuery({
    type: movieQuery === undefined ? '' : movieQuery.query,
    page,
    countries,
    order,
    year,
    genreId: movieQuery?.url === '/cartoons' ? String(18) : genreId,
  });

  const responseGenresAndCountries = useGetGenresAndCountriesQuery();

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error || responseGenresAndCountries.error)
    return <ErrorMessage />;
  if (responseFilms.isLoading || responseGenresAndCountries.error)
    return <MoviesListMainSkeleton />;

  return (
    <>
      <Stack flexDirection="row" mt={2} mb={2}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieQuery?.title}</Typography>
      </Stack>
      <SelectMovies
        genresList={
          responseGenresAndCountries.data === undefined
            ? []
            : responseGenresAndCountries.data.genres
        }
        countriesList={
          responseGenresAndCountries.data === undefined
            ? []
            : responseGenresAndCountries.data.countries
        }
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
      />
      <MoviesList
        movies={responseFilms.data?.items}
        totalPages={responseFilms.data?.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
