import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../../common/app/components';
import AppV1 from '../../../root';
import { Login } from '../auth';

const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/v2/login" component={Login} />
      <Route path="/" component={AppV1} />
    </Switch>
  </BrowserRouter>
);

export default Routing;
