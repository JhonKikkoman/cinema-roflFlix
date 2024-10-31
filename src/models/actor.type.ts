interface IFilms {
  description: string;
  filmId: number;
  general: boolean;
  nameEn: string;
  nameRu: string;
  professionKey: string;
  rating: string;
}

export interface IActor {
  age: number;
  birthday: string | null;
  birthplace: string;
  death: string | null;
  deathplace: string | null;
  facts: string[];
  films: IFilms[];
  growth: number;
  hasAwards: number;
  nameEn: string;
  nameRu: string;
  personId: number;
  posterUrl: string;
  profession: string;
  sex: string;
  spouses: [];
  webUrl: string;
}
