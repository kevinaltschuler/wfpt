import React from 'react';
import Header from './Header/Header';

const AppContainer = (props) => (
  <div>
    <Header />
    { props.children }
  </div>
);

AppContainer.propTypes = {
  children: React.PropTypes.object,
};

export default AppContainer;
