import { Link } from '@mui/material';
//@ts-expect-error no @types bear-react-carousel
import { BearSlideImage } from 'bear-react-carousel';
import React from 'react';

import { movieT } from '../models/movie.type';

export const serializeDataForCarousel = (data: movieT[]) => {
  return data.map(row => (
    <Link key={row.kinopoiskId} href={`/movie/${row.kinopoiskId}`}>
      <BearSlideImage imageUrl={row.posterUrlPreview} />
    </Link>
  ));
};
