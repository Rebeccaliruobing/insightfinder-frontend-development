import React from 'react';
import { connect } from 'react-redux';
import { Loader } from '../../lib/fui/react';
import logo from '../../common/app/images/logo.png';
import type { State } from '../../common/types';

type Props = {
  appLoaderVisible: bool,
};

const Loading = ({
  appLoaderVisible,
}: Props) => (
  <Loader fullScreen imageSrc={logo} visible={appLoaderVisible} />
);

export default connect(
  (state: State) => ({
    appLoaderVisible: state.app.appLoaderVisible,
  }),
)(Loading);
