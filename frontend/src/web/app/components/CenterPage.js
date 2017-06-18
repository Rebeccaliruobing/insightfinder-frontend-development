import React from 'react';
import moment from 'moment';
import { Container, Image, Box } from '../../../lib/fui/react';

import logo from '../../../../images/logo.png';

type Props = {
  className: string,
  children: Element<any>,
  style: Object,
};

const CenterPage = ({ style = { width: 320 }, className, children }: Props) => (
  <Container screenCenter className={`center-page ${className || ''}`} style={style}>
    <div style={{ marginBottom: 24, textAlign: 'center' }}>
      <Image size={200} src={logo} />
    </div>
    <Box raised>{children}</Box>
    <div className="copyright">
      {`Copyright © ${moment().year()} InsightFinder Inc.`}
    </div>
  </Container>
);

export default CenterPage;
