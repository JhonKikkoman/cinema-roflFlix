import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface IContext {
  mode: 'dark' | 'light' | '';
  toggleColorMode?: () => void;
}

export const ColorModeContext = createContext<IContext>({ mode: '' });

export default function ToggleColorMode({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode(prevState => (prevState === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('light') as PaletteMode;
    if (themeFromLocalStorage) {
      setMode(themeFromLocalStorage);
    } else {
      localStorage.setItem('theme', 'dark ');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
