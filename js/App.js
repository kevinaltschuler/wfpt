import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import AppContainer from './AppContainer';

export default () => (
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}></Route>
    </Router>
  </div>
);
