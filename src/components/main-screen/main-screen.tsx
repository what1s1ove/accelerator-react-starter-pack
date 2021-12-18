import { AppRoutes, CATALOG_SCREEN } from 'constants/routes';
import React from 'react';
import { Redirect } from 'react-router-dom';

function MainScreen(): JSX.Element {
  return (
    <Redirect to={AppRoutes[CATALOG_SCREEN]}/>
  );
}

export default MainScreen;
