import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../../common/app/components';
import AppV1 from '../../../root';

const Routing = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/v2/login" render={() => (<div>Login</div>)} />
      <PrivateRoute path="/v2" render={({ match }) => (<div>{match.url}</div>)} />
      <Route path="/" component={AppV1} />
    </Switch>
  </BrowserRouter>
);

export default Routing;
