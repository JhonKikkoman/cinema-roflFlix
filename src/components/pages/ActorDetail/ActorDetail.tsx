import { ArrowBack } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import {
  Box,
  Button,
  Divider,
  Grid2,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetStuffByIdQuery } from '../../../services/kinopoisk.api';
import LoadingSpinner from '../../ui/CustomUiComponent/Spinner';
import ErrorMessage from '../../ui/ErrorMessage';

const sex = {
  MALE: 'Мужчина',
  FEMALE: 'Женщина',
};

const professionKey = {
  DIRECTOR: 'Режиссёр',
  EDITOR: 'Редактор',
  OPERATOR: 'Оператор',
  WRITER: 'Сценарист',
  HIMSELF: 'Мемуары',
  PRODUCER: 'Продюсер',
  ACTOR: 'Актёр',
};

export default function ActorDetail() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetStuffByIdQuery(id);

  if (isError) return <ErrorMessage />;
  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Grid2 container pt={1} spacing={4} mb={1}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <img src={data?.posterUrl} width="100%" alt={data?.nameRu} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Stack flexDirection="row">
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
            <Stack flexDirection="column">
              <Typography variant="h5">{data?.nameRu}</Typography>
              <Typography>{data?.nameEn}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Typography gutterBottom variant="h5">
            Об актере :
          </Typography>

          <Grid2 container flexDirection="column">
            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Карьера : </Typography>
              <Typography>{data?.profession}</Typography>
            </Grid2>

            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Рост : </Typography>
              <Typography>
                {data?.growth === 0 ? 'Рост не указан' : data?.growth}
              </Typography>
            </Grid2>

            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Дата рождения/возраст : </Typography>
              <Typography>
                {data?.birthday} /{' '}
                {data?.age === 0 ? 'Возраст не указан' : `${data?.age} лет`}
              </Typography>
            </Grid2>

            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Место рождения : </Typography>
              <Typography>{data?.birthplace}</Typography>
            </Grid2>

            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Пол : </Typography>
              <Typography>{sex[data?.sex as keyof typeof sex]}</Typography>
            </Grid2>

            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Факты : </Typography>
              <Box>
                {data?.facts.length === 0 ? (
                  'Факты не указаны'
                ) : (
                  <Box mb={1}>
                    {data?.facts.map((fact, index) => (
                      <Typography key={index}>
                        {`${index + 1}. ` + fact}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Grid2>

            <Divider />
            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Всего фильмов : </Typography>
              <Typography>{data?.films.length}</Typography>
            </Grid2>
            <Grid2
              container
              size={{ xs: 12, sm: 6 }}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography variant="h6">Награды : </Typography>
              <Box>
                {data?.hasAwards === 0 ? (
                  'Награды не указаны'
                ) : (
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <Typography>{data?.hasAwards}</Typography>
                    <EmojiEventsIcon fontSize="small" color="success" />
                  </Box>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
      <Typography variant="h5" margin="auto">
        Фильмы :
      </Typography>
      <Stack>
        {data?.films.map((film, index) => (
          <Stack
            key={`${film.filmId}_${film.professionKey}_${index}`}
            flexDirection="row"
            justifyContent="space-between"
            mb={1}
          >
            <Typography>{index + 1}</Typography>
            <Typography>
              <Link
                href={`/movie/${film.filmId}`}
                sx={{ textDecoration: 'none' }}
              >
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              {` - ${professionKey[film.professionKey as keyof typeof professionKey]}`}
            </Typography>
            <Typography>
              {film.rating == null ? (
                <MoodBadIcon fontSize="small" />
              ) : (
                film.rating
              )}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
