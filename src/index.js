import React from 'react';
import ReactDOM from 'react-dom';
import GolfleApp from './GolfleApp'
import {HashRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GolfleApp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
