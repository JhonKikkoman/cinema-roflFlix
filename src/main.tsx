import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.tsx';
import { store } from './store/store.ts';

import 'bear-react-carousel/dist/index.css';

import ToggleColorMode from './context/ToggleColorMode.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorMode>
        <CssBaseline />
        <App />
      </ToggleColorMode>
    </Provider>
  </React.StrictMode>,
);
