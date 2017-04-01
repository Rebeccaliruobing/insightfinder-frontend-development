import React from 'react';
import { ImageLoader } from '../../lib/fui/react';
import logo from '../../common/app/images/logo.png';

type Props = {
  visible: bool,
};

const Loading = ({
  visible,
}: Props) =>
  (visible ?
    (<ImageLoader fullScreen imageSrc={logo} size={120} visible />) :
    null
  );

export default Loading;
