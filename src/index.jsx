import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RUARobotProvider from './context/RUARobotProvider';
import './index.css';

render(
  <React.StrictMode>
    <RUARobotProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RUARobotProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
