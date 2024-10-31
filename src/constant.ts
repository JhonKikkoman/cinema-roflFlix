import {
  AutoAwesome,
  Bloodtype,
  FamilyRestroom,
  LiveTv,
  LocalMovies,
  MenuBook,
  MoodBad,
  Pool,
  StarPurple500,
  VolunteerActivism,
} from '@mui/icons-material';
import DvrIcon from '@mui/icons-material/Dvr';
import FortIcon from '@mui/icons-material/Fort';

import { listsT } from './models/constants.types';

export const iconComponent = {
  AutoAwesome,
  StarPurple500,
  Bloodtype,
  MenuBook,
  FamilyRestroom,
  VolunteerActivism,
  MoodBad,
  Pool,
  LiveTv,
  FortIcon,
  LocalMovies,
  DvrIcon,
};

export const TOP_LISTS: listsT[] = [
  {
    title: 'Top 100 films',
    icon: 'AutoAwesome',
    url: '/popular',
    query: 'TOP_POPULAR_MOVIES',
  },
  {
    title: 'Top 250 films',
    icon: 'StarPurple500',
    url: '/best',
    query: 'TOP_250_MOVIES',
  },
  {
    title: 'Vampire',
    icon: 'Bloodtype',
    url: '/vampire',
    query: 'VAMPIRE_THEME',
  },
  {
    title: 'Comics',
    icon: 'MenuBook',
    url: '/comics',
    query: 'COMICS_THEME',
  },
  {
    title: 'Home',
    icon: 'FamilyRestroom',
    url: '/family',
    query: 'FAMILY',
  },
  {
    title: 'Romantic',
    icon: 'VolunteerActivism',
    url: '/romantic',
    query: 'LOVE_THEME',
  },
  {
    title: 'Zombie',
    icon: 'MoodBad',
    url: '/zombie',
    query: 'ZOMBIE_THEME',
  },
  {
    title: 'Disaster',
    icon: 'Pool',
    url: '/disaster',
    query: 'CATASTROPHE_THEME',
  },
  {
    title: 'Popular serials',
    icon: 'LiveTv',
    url: '/popular-serials',
    query: 'POPULAR_SERIES',
  },
];

export const MOVIE_LIST: listsT[] = [
  {
    title: 'Фильмы',
    icon: 'LocalMovies',
    url: '/films',
    query: 'FILM',
  },
  {
    title: 'Cериалы',
    icon: 'DvrIcon',
    url: '/serials',
    query: 'TV_SERIES',
  },
  {
    title: 'Мультфильмы',
    icon: 'FortIcon',
    url: '/cartoons',
    query: 'FILM',
  },
];
