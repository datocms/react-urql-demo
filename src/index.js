import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.sass';
import App from './components/App';
import { Provider } from 'urql';
import client from './client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider value={client}>
    <App />
  </Provider>,
);
