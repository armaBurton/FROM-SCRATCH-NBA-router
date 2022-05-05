import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RUARobotProvider from './context/RUARobotProvider';
import './index.css';

render(
  <React.StrictMode>
    <BrowserRouter>
      <RUARobotProvider>
        <App />
      </RUARobotProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
