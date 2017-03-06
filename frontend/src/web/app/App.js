/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import type { State } from '../../common/types';
import { Container } from '../../lib/fui/react';
import start from '../../common/app/start';
import { ThemeProvider } from '../../common/app/components';
import * as themes from './themes';

type Props = {
  currentLocale: string,
  currentTheme: string,
};

export const AppCore = ({
  currentLocale, currentTheme,
}: Props) => {
  return (
    <ThemeProvider theme={themes[currentTheme] || themes.light}>
      <Container fullHeight>
        <Helmet
          htmlAttributes={{
            lang: currentLocale,
            class: currentTheme ? `${currentTheme} theme` : '',
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default connect(
  (state: State) => ({
    currentTheme: state.app.currentTheme,
    currentLocale: state.app.currentLocale,
  }),
)(start(AppCore));
