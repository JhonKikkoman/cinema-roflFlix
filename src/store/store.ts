import { configureStore } from '@reduxjs/toolkit';

import { kinopoiskApi } from '../services/kinopoisk.api';
import currentQueryReducer from './features/currentQuery.slice';
import setSearchQueryReducer from './features/searchQuery.slice';

export const store = configureStore({
  reducer: {
    currentQuerySlice: currentQueryReducer,
    searchQuerySlice: setSearchQueryReducer,
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(kinopoiskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
