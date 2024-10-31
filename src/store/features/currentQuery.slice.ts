import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  genreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
  keyword: '',
};

export const currentQuerySlice = createSlice({
  name: 'currentQuery',
  initialState: initialState,
  reducers: {
    selectQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    resetQuery: () => ({
      ...initialState,
    }),
  },
});

export const { selectQuery, resetQuery } = currentQuerySlice.actions;
export default currentQuerySlice.reducer;

export type currentQueryT = ReturnType<
  typeof currentQuerySlice.getInitialState
>;
