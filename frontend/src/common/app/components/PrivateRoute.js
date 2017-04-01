/* @flow */
import React from 'react';
import { Route as ReactRouterRoute, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { State } from '../../types';

type Props = {
  loggedIn: bool,
  appInited: bool,
  loginUrl: string,
  component: Function,
  render: Function,
  children: Function,
};

export const PrivateRouteCore = ({
  loggedIn = false,
  appInited = false,
  loginUrl = '/login',
  render,
  children,
  component: Component,
  ...props
}: Props) =>
  (
    <ReactRouterRoute
      {...props}
      render={(renderProps) => {
        if (loggedIn) {
          // If application is not inited, return null to not render private component.
          if (!appInited) {
            return null;
          }

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
              pathname: loginUrl,
              state: { from: renderProps.location },
            }}
          />
        );
      }}
    />
  );

export default connect(
  (state: State) => ({
    appInited: state.app.inited,
    loggedIn: state.auth.loggedIn,
  }),
)(PrivateRouteCore);
