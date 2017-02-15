import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import HomePage from './HomePage/HomePage';
import Shop from './Shop/Shop';
import Specials from './Specials/Specials';
import Submit from './Submit/Submit';
import Tour from './Tour/Tour';
import Trailers from './Trailers/Trailers';
import AppContainer from './AppContainer';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={HomePage} />
      <Route path="/tour" component={Tour} />
      <Route path="/specials" component={Specials} />
      <Route path="/trailers" component={Trailers} />
      <Route path="/submit" component={Submit} />
      <Route path="/shop" component={Shop} />
    </Route>
  </Router>
);
