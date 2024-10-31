import { ArrowBack, Movie as MovieIcon } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import {
  Button,
  ButtonGroup,
  Divider,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useGetFilmQuery,
  useGetSequelAndPrequelQuery,
  useGetStuffQuery,
} from '../../../services/kinopoisk.api';
import MovieCard from '../../ui/CustomUiComponent/MovieCard';
import LoadingSpinner from '../../ui/CustomUiComponent/Spinner/LoadingSpinner';
import ErrorMessage from '../../ui/ErrorMessage';
import VideoPlayer from '../../ui/VideoPlayer';

export default function MoviesDetail() {
  const isMobile = useMediaQuery('(max-width:460px');
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const responseFilm = useGetFilmQuery(id);
  const responseSequel = useGetSequelAndPrequelQuery(id);
  const responseStuff = useGetStuffQuery(id);
  if (responseFilm.isError || responseStuff.isError) return <ErrorMessage />;

  if (
    responseFilm.isLoading ||
    responseSequel.isLoading ||
    responseStuff.isLoading
  )
    return <LoadingSpinner />;

  return (
    <>
      <Grid container spacing={2} sx={{ mt: { md: 2 } }}>
        <Grid size={{ md: 4, sm: 12 }}>
          <img
            src={
              responseFilm.data?.posterUrl == null
                ? ''
                : responseFilm.data?.posterUrl
            }
            alt={
              responseFilm.data?.nameRu === null
                ? ''
                : responseFilm.data?.nameRu
            }
            width="100%"
          />
        </Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Grid container>
            <Grid size={{ xs: 2 }}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid size={{ xs: 4 }} alignContent="center">
              <Typography variant="h6">{responseFilm.data?.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid container justifyContent="space-between">
              <Grid size={{ xs: 6 }}>
                <Typography variant="h6">Год :</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography gutterBottom>{responseFilm.data?.year}</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" mb={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="h6">Страна :</Typography>
              </Grid>
              <Grid
                container
                size={{ xs: 6 }}
                direction="column"
                alignItems="flex-end"
              >
                {responseFilm.data?.countries.map(({ country }) => (
                  <Typography gutterBottom key={country}>
                    {country}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" mb={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="h6">Жанры :</Typography>
              </Grid>
              <Grid
                container
                size={{ xs: 6 }}
                direction="column"
                alignItems="flex-end"
              >
                {responseFilm.data?.genres.map(({ genre }) => (
                  <Typography gutterBottom key={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </Typography>
                ))}
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid size={{ xs: 6 }}>
                <Typography variant="h6">Режиссеры :</Typography>
              </Grid>
              <Grid
                container
                size={{ xs: 6 }}
                direction="column"
                alignItems="flex-end"
              >
                {responseStuff.data
                  ?.filter(el => el.professionText === 'Режиссеры')
                  .slice(0, 15)
                  .map(({ nameRu, nameEn }) => (
                    <Typography gutterBottom key={nameRu}>
                      {nameRu}/{nameEn}
                    </Typography>
                  ))}
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid size={{ xs: 6 }}>
                <Typography variant="h6">Продолжительность :</Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography gutterBottom>
                  {responseFilm.data?.filmLength} мин
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom variant="h6">
                Описание :
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography gutterBottom>
                {responseFilm.data?.description
                  ? responseFilm.data?.description
                  : 'Описание отсутствует'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ sm: 2, xs: 12 }}>
          <Typography variant="h5" whiteSpace="nowrap">
            В главных ролях:
          </Typography>
          <Grid container>
            {responseStuff.data
              ?.filter(el => el.professionText === 'Актеры')
              .slice(0, 15)
              .map(({ nameRu, staffId }) => (
                <Link
                  href={`/actor/${staffId}`}
                  sx={{ textDecoration: 'none' }}
                  gutterBottom
                  key={nameRu}
                >
                  {nameRu},
                </Link>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <ButtonGroup variant="outlined" size="small">
            <Link
              target="_blank"
              rel="noopener"
              href={responseFilm.data?.webUrl}
            >
              <Button
                endIcon={<LanguageIcon />}
                sx={{ alignItems: 'flex-start' }}
              >
                Кинопоиск
              </Button>
            </Link>
            <Link
              target="_blank"
              rel="noopener"
              href={`https://www.imdb.com/title/${responseFilm.data?.imdbId}`}
            >
              <Button endIcon={<MovieIcon />} sx={{ alignItems: 'flex-start' }}>
                IMDB
              </Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid container size={{ xs: 12 }} direction="column">
        <Typography variant="h5" margin="auto">
          Смотреть Онлайн:
        </Typography>
        <VideoPlayer />
      </Grid>
      <Stack>
        <Typography gutterBottom variant="h5" margin="auto">
          Сиквелы и приквелы:
        </Typography>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          gap={1}
          justifyContent="center"
        >
          {responseSequel.data === undefined ? (
            <Typography variant="h5" margin="auto">
              Сиквел/приквел отсутствует.
            </Typography>
          ) : (
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              {responseSequel.data?.map(movie => (
                <MovieCard key={movie.kinopoiskId} movie={movie} reload />
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}
