import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style.scss';
import * as serviceWorker from './serviceWorker';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />{' '}
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
