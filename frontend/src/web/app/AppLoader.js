import React from 'react';
import { Loader } from '../../lib/fui/react';
import logo from '../../common/app/images/logo.png';

type Props = {
  visible: bool,
};

const AppLoader = ({
  visible,
}: Props) =>
  (visible ? (<Loader fullScreen imageSrc={logo} size={120} visible />) : null);

export default AppLoader;
