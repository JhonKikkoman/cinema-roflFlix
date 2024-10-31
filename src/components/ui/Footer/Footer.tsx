import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Link, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: 'row' },
        justifyContent: { sm: 'space-between' },
        alignItems: { sm: 'center' },
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="#3f51b5">
        &copy; {new Date().getFullYear()} &laquo;roflFlix&raquo;18+ <br />
        Данный сайт создан исключительно в обучающих целях. <br />
        Все права принадлежат правообладателям
      </Typography>
      <Link
        href="/"
        sx={{ textDecoration: 'none' }}
        display="flex"
        flexDirection="row"
      >
        <Typography color="#3f51b5" variant="h5">
          roflFlix
        </Typography>
        <SentimentSatisfiedAltIcon sx={{ color: '#3f51b5' }} />
      </Link>
    </Stack>
  );
}
