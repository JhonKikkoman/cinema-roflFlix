import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import {
  resetQuery,
  selectQuery,
} from '../../../store/features/currentQuery.slice';

interface propT {
  genresList: { id: number; genre: string }[];
  countriesList: { id: number; country: string }[];
  countries: string;
  order: string;
  year: string;
  genreId: string;
}
export default function SelectMovies({
  genresList,
  countriesList,
  countries,
  order,
  year,
  genreId,
}: propT) {
  const dispatch = useDispatch();

  const orderList = [
    { title: 'По оценкам', value: 'NUM_VOTE' },
    { title: 'По рейтингу', value: 'RATING' },
  ];

  const yearList = new Array(45).fill(null).map((_, index) => ({
    value: new Date().getFullYear() - index,
  }));

  return (
    <Stack
      sx={{ flexDirection: { sm: 'column', md: 'row' } }}
      gap={1}
      mt={1}
      mb={1}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Cортировка</InputLabel>
        <Select
          label="Cортировка"
          IconComponent={ExpandMoreIcon}
          value={order}
          onChange={({ target }) =>
            dispatch(selectQuery({ order: target.value }))
          }
        >
          {orderList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Страна</InputLabel>
        <Select
          label="Страна"
          IconComponent={ExpandMoreIcon}
          value={countries}
          onChange={({ target }) =>
            dispatch(selectQuery({ countries: target.value }))
          }
        >
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Жанр</InputLabel>
        <Select
          label="Жанр"
          IconComponent={ExpandMoreIcon}
          value={genreId}
          onChange={({ target }) =>
            dispatch(selectQuery({ genreId: target.value }))
          }
        >
          {genresList.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Год</InputLabel>
        <Select
          label="Год"
          IconComponent={ExpandMoreIcon}
          value={year}
          onChange={({ target }) =>
            dispatch(selectQuery({ year: target.value }))
          }
        >
          {yearList.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button
          variant="outlined"
          size="medium"
          sx={{ pt: '8.5px' }}
          endIcon={<CancelIcon color="info" />}
          onClick={() => dispatch(resetQuery())}
        >
          Cбросить
        </Button>
      </Box>
    </Stack>
  );
}
