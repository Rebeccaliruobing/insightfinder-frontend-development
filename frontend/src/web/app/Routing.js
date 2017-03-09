import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../common/app/components';

const Routing = () => (
  <Switch>
    <Route path="/v2/login" render={() => (<div>Login</div>)} />
    <PrivateRoute render={({ match }) => (<div>{match.url}</div>)} />
  </Switch>
);

export default Routing;
