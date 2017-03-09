/* @flow */
import React from 'react';
import { Route as ReactRouterRoute, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { State } from '../../types';

type Props = {
  loggedIn: boolean,
  component: Function,
  render: Function,
  children: Funciton,
};

export const PrivateRouteCore = ({
  loggedIn = false,
  render,
  children,
  component: Component,
  ...props
}: Props) =>
  (
    <ReactRouterRoute
      {...props}
      render={(renderProps) => {
        if (!loggedIn) {
          if (Component) {
            return (<Component {...renderProps} />);
          } else if (render) {
            return render(renderProps);
          }
          return children(renderProps);
        }

        return (
          <Redirect
            to={{
              pathname: '/v2/login',
              state: { from: renderProps.location },
            }}
          />
        );
      }}
    />
  );

export default connect(
  (state: State) => ({
    loggedIn: state.session.loggedIn,
  }),
)(PrivateRouteCore);
