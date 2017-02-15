import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import HomePage from './HomePage/HomePage';
import AppContainer from './AppContainer';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/home" component={HomePage} />
    </Route>
  </Router>
);
