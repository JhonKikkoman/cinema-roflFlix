export interface movieT {
  countries: { country: string }[];
  coverUrl: string;
  description: string | null;
  genres: { genre: string }[];
  imdbId: string | null;
  kinopoiskId: number | null;
  logoUrl: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  nameRu: string | null | undefined;
  posterUrl: string | null | undefined;
  posterUrlPreview: string | null;
  ratingAgeLimits: string | null;
  ratingImdb: number | null;
  ratingKinopoisk: number | null;
  type: string | null;
  year: number | null;
  filmLength: number;
  webUrl: string;
  filmId: number;
  relationType: string;
}
