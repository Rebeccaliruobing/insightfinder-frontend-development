import React from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import { withRouter as withRouterCore } from 'react-router-dom';
import { hideAppLoader } from '../../common/app/actions';

const withRouteApp = (Component) => {
  class Wrapper extends React.Component {

    componentDidMount() {
      this.props.hideAppLoader();
    }

    render() {
      const { history, location, ...rest } = this.props;

      const newLocation = {
        ...history.location,
        query: qs.parse((location.search || '?').slice(1)),
      };
      return <Component location={newLocation} {...rest } />;
    }
  }

  return withRouterCore(connect(
    () => ({}),
    { hideAppLoader },
  )(Wrapper));
};

export default withRouteApp;
