/* @flow */
import React from 'react';
import { Match as ReactRouterMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import type { State } from '../../types';

const hasAccess = (anonymouse, loggedIn) => (anonymouse ? true : loggedIn);

// TODO: Fix flow type with react componenent
type Props = {
  anonymouse: boolean,
  loggedIn: boolean,
  component: any,
  render: Function,
};

export const MatchCore = ({
  anonymouse = false,
  loggedIn = false,
  render,
  component: Component,
  ...props
}: Props) => (
  <ReactRouterMatch
    {...props}
    render={(renderProps) => {
      if (hasAccess(anonymouse, loggedIn)) {
        return render ? render(renderProps) : (<Component {...renderProps} />);
      }

      return (
        <Redirect
          to={{
            pathname: '/login',
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
)(MatchCore);
