import { useSelector } from 'react-redux';

import { TOP_LISTS } from '../constant';
import {
  useGetFilmsQuery,
  useGetTopFilmsQuery,
} from '../services/kinopoisk.api';
import { RootState } from '../store/store';

export default function useMoviesQuery() {
  const { page, countries, order, year } = useSelector(
    (state: RootState) => state.currentQuerySlice,
  );
  const popular = useGetTopFilmsQuery({ type: TOP_LISTS[0].query, page });
  const best = useGetTopFilmsQuery({ type: TOP_LISTS[1].query, page });

  const films = useGetFilmsQuery({
    type: 'FILM',
    countries,
    genreId: '1',
    order,
    year,
    page,
  });
  const serials = useGetFilmsQuery({
    type: 'TV_SERIES',
    countries,
    genreId: '1',
    order,
    year,
    page,
  });
  const cartoons = useGetFilmsQuery({
    type: 'FILM',
    countries,
    genreId: '18',
    order,
    year,
    page,
  });

  const isLoading =
    popular.isLoading ||
    best.isLoading ||
    films.isLoading ||
    serials.isLoading ||
    cartoons.isLoading;

  const isError =
    popular.isError ||
    best.isError ||
    films.isError ||
    serials.isError ||
    cartoons.isError;

  return { popular, best, films, serials, cartoons, isLoading, isError };
}
