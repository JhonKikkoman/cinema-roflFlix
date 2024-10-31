import { Box, Link, Rating, Stack, Tooltip } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { movieT } from '../../../../models/movie.type';
import styles from './MovieCard.module.css';

interface IProps {
  movie: movieT;
  reload: boolean;
}

export default function MovieCard({ movie, reload = false }: IProps) {
  const linkProps = reload
    ? { component: 'a', href: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Link
        display="flex"
        flexDirection="column"
        sx={{ textDecoration: 'none' }}
        {...linkProps}
      >
        <Box
          className={styles.effect}
          textAlign="center"
          mb={1}
          sx={{
            textDecoration: 'none',
            fontSize: '1rem',
            position: 'relative',
          }}
        >
          {movie.nameRu ? movie.nameRu : movie.nameEn}
        </Box>
        <Box display="flex" justifyContent="center">
          <img
            src={movie.posterUrlPreview === null ? '' : movie.posterUrlPreview}
            alt={movie?.nameRu === null ? '' : movie.nameRu}
            className={styles.img}
          />
        </Box>
      </Link>
      {movie.ratingKinopoisk && (
        <Stack>
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk}
                readOnly
                precision={0.1}
                max={10}
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Box>
  );
}
