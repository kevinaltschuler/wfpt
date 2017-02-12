import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import HomePage from './HomePage/HomePage';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}>
    </Route>
  </Router>
);
