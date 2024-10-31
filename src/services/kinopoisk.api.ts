import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IActor } from '../models/actor.type';
import { movieT } from '../models/movie.type';
import { stuffT } from '../models/stuff.type';

interface argT {
  type: string;
  page: number;
}

interface genresAndCountriesT {
  genres: { id: number; genre: string }[];
  countries: { id: number; country: string }[];
}

interface IQuery {
  countries: string;
  genreId: string;
  order: string;
  type: string;
  year: string;
  page: number;
  keyword?: string;
}

interface IFilmsResponse {
  items: movieT[];
  totalPages: number;
  page: number;
}

const excludeGenre = [
  '',
  'для взрослых',
  'церемония',
  'реальное ТВ',
  'ток-шоу',
];

const apiKey = import.meta.env.VITE_API_KEY;

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: hearder => {
      hearder.set('X-API-KEY', apiKey);
      hearder.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({
    getTopFilms: builder.query({
      query: ({ type, page }: argT) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getFilms: builder.query<IFilmsResponse, IQuery>({
      query: ({
        countries,
        genreId,
        order = 'NUM_VOTE',
        type = 'FILM',
        year,
        page,
        keyword = '',
      }: IQuery) =>
        `/v2.2/films?countries=${countries.length === 0 ? 1 : countries}&genres=${genreId.length === 0 ? 1 : genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}&keyword=${keyword}`,
    }),
    getGenresAndCountries: builder.query<genresAndCountriesT, void>({
      query: () => `v2.2/films/filters`,
      transformResponse: (response: genresAndCountriesT) => ({
        ...response,
        genres: response.genres.filter(
          ({ genre }) => !excludeGenre.includes(genre),
        ),
      }),
    }),
    getFilm: builder.query<movieT, string>({
      query: (id: string) => `/v2.2/films/${id === undefined ? '' : id}`,
    }),
    getSequelAndPrequel: builder.query({
      query: (id: string) =>
        `v2.1/films/${id === undefined ? '' : id}/sequels_and_prequels`,
      transformResponse: (response: movieT[]) =>
        response.map(el => ({ ...el, kinopoiskId: el.filmId })),
    }),
    getStuff: builder.query<stuffT[], string>({
      query: (id: string) => `/v1/staff?filmId=${id === undefined ? '' : id}`,
    }),
    getStuffById: builder.query<IActor, string>({
      query: (id: string) => `v1/staff/${id}`,
    }),
  }),
});

export const {
  useGetTopFilmsQuery,
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
  useGetFilmQuery,
  useGetSequelAndPrequelQuery,
  useGetStuffQuery,
  useGetStuffByIdQuery,
} = kinopoiskApi;
