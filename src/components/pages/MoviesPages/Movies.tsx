import { Box, Link, Stack } from '@mui/material';
// @ts-expect-error no @types for bear-react-carousel
import BearCarousel from 'bear-react-carousel';
import React, { ReactNode } from 'react';

import useMoviesQuery from '../../../hooks/useMoviesQuery';
import { serializeDataForCarousel } from '../../../utils/serializeData.utils';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieSkeleton from '../MoviesListTop/MovieListTopSkeleton';

interface carouselArrT {
  title: string;
  url: string;
  data: ReactNode[];
  autoPlayTime: number;
}

export default function Movies() {
  const { popular, best, films, serials, cartoons, isLoading, isError } =
    useMoviesQuery();

  if (isLoading) return <MovieSkeleton />;
  if (isError) return <ErrorMessage />;

  const carouselArr: carouselArrT[] = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: serializeDataForCarousel(popular.data.items),
      autoPlayTime: 3000,
    },
    {
      title: 'Лучшие фильмы',
      url: '/best',
      data: serializeDataForCarousel(best.data.items),
      autoPlayTime: 4000,
    },
    {
      title: 'Фильмы',
      url: '/films',
      data: serializeDataForCarousel(films.data.items),
      autoPlayTime: 5000,
    },
    {
      title: 'Сериалы',
      url: '/serials',
      data: serializeDataForCarousel(serials.data.items),
      autoPlayTime: 3000,
    },
    {
      title: 'Мультфильмы',
      url: '/cartoons',
      data: serializeDataForCarousel(cartoons.data.items),
      autoPlayTime: 6000,
    },
  ];

  return (
    <Stack>
      {carouselArr.map(item => (
        <Box key={item.title}>
          <Link
            underline="hover"
            href={item.url}
            sx={{ fontSize: '1.2rem', mt: 1, mb: 1 }}
          >
            {item.title}
          </Link>
          <BearCarousel
            data={item.data}
            isEnableNavButton
            slidesPerView={1}
            spaceBetween={1}
            isEnableLoop
            initStartPlayTime={5000}
            autoPlayTime={item.autoPlayTime}
            breakpoints={{ 460: { slidesPerView: 4, isEnableAutoPlay: true } }}
          />
        </Box>
      ))}
    </Stack>
  );
}
