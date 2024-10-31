import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useGetFilmsQuery } from '../../../services/kinopoisk.api';
import { setSearchQuery } from '../../../store/features/searchQuery.slice';
import { RootState } from '../../../store/store';

const movieTypes = {
  FILM: 'Фильм',
  TV_SERIES: 'Cериал',
  TV_SHOW: 'ТВ-Шоу',
  MINI_SERIES: 'Мини-сериал',
};

export default function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countries, genreId, order, type, year, page, keyword } = useSelector(
    (state: RootState) => state.searchQuerySlice,
  );

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);
    return () => clearTimeout(setTimeoutId);
  }, [input]);

  const { data, isFetching } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword,
  });
  return (
    <Autocomplete
      freeSolo
      sx={{
        width: 300,
        ml: 1,
        borderRadius: 1,
        '& .MuiAutocomplete-inputRoot': {
          color: 'white',
          border: '1px solid',
          padding: '6px',
          borderRadius: '7px',
        },
      }}
      getOptionLabel={option =>
        `${typeof option !== 'string' && option.nameRu} - ${movieTypes[(typeof option !== 'string' && option.type) as keyof typeof movieTypes]} - ${typeof option !== 'string' && option.year}`
      }
      options={data ? data.items : []}
      onInputChange={(_, value) => {
        setInput(value);
      }}
      onChange={(_, value) => {
        if (value !== null && typeof value !== 'string') {
          navigate(`/movie/${value?.kinopoiskId}`);
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Поиск"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
