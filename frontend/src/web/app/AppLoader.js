import React from 'react';
import { connect } from 'react-redux';
import { ImageLoader } from '../../lib/fui/react';
import logo from '../../common/app/images/logo.png';
import type { State } from '../../common/types';

type Props = {
  appLoaderVisible: bool,
};

const Loading = ({
  appLoaderVisible,
}: Props) => (
  <ImageLoader fullScreen imageSrc={logo} size={120} visible={appLoaderVisible} />
);

export default connect(
  (state: State) => ({
    appLoaderVisible: state.app.appLoaderVisible,
  }),
)(Loading);
