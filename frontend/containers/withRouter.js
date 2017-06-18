import React from 'react';
import qs from 'qs';
import { isObject } from 'lodash';

// TODO: v1 <=> next
import { withRouter as withRouterV1 } from 'react-router';
import { withRouter as withRouterCore } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = ({ ...props }) => {
    const { history, location, ...rest } = props;

    const router = {
      push: (params) => {
        if (isObject(params)) {
          const { pathname, query } = params;
          return history.push({
            pathname,
            search: '?' + qs.stringify(query),
          });
        }
        return history.push(arguments);
      },
      replace: (params) => {
        if (isObject(params)) {
          const { pathname, query } = params;
          return history.replace({
            pathname,
            search: '?' + qs.stringify(query),
          });
        }
        return history.replace(arguments);
      },
    };

    const newLocation = {
      ...history.location,
      query: qs.parse((location.search || '?').slice(1)),
    };

    return <Component router={router} location={newLocation} {...rest} />;
  };

  return withRouterCore(Wrapper);
};

// TODO: v1 <=> next
// export default withRouterV1;
export default withRouter;
