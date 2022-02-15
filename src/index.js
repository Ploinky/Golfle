import React from 'react';
import ReactDOM from 'react-dom';
import GolfleApp from './GolfleApp'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GolfleApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
