import React from 'react';
import Header from './Header/Header';

const AppContainer = (props) => (
  <div>
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1200px'
      }}
    >
      { props.children }
    </div>
  </div>
);

AppContainer.propTypes = {
  children: React.PropTypes.object,
};

export default AppContainer;
