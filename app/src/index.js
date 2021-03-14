import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';

import { AppLayout } from './layouts/AppLayout'

import { AppContextProvider } from './contexts/AppContext'

ReactDOM.render(
  <AppContextProvider>
    <AppLayout>
      <App />
    </AppLayout>
  </AppContextProvider>,
  document.getElementById('root')
);

