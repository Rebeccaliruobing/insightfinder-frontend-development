/* @flow */
import React from 'react';
import { Container, Image } from '../../../lib/fui/react';
import logo from '../../../../images/logo.png';

type Props = {
  className: string,
  children: Element<any>,
  style: Object,
};

const CenterContainer = ({ style = { width: 320 }, className, children }: Props) => (
  <Container screenCenter className={className} style={style}>
    <div style={{ margin: 12 }}>
      <Image size={200} src={logo} />
    </div>
    {children}
  </Container>
);

export default CenterContainer;
