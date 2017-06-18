import React from 'react';
import { Loader } from '../../../lib/fui/react';

type Props = {
  visible: bool,
};

const SinglePageLoader = ({
  visible,
}: Props) =>
  (visible ? (<Loader size={48} visible />) : null);

export default SinglePageLoader;
