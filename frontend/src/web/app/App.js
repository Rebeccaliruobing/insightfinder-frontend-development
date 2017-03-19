import React from 'react';
import { omit } from 'ramda';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { autobind, debounce } from 'core-decorators';
import Measure from 'react-measure';
import { Container } from '../../lib/fui/react';
import type { State } from '../../common/types';
import start from '../../common/app/start';
import { ThemeProvider } from '../../common/app/components';
import { setViewport } from '../../common/app/actions';
import Routing from './Routing';
import AppLoader from './AppLoader';
import * as themes from './themes';
import './app.scss';

type Props = {
  currentLocale: string,
  currentTheme: string,
  appStarted: bool,
  setViewport: Function,
};

// TODO: Listen scrolling event and save position into redux store.
export class AppCore extends React.Component {
  props: Props;

  @autobind
  @debounce(300)
  handleOnResize(dimensions) {
    const { width, height } = dimensions;
    this.props.setViewport(width, height);
  }

  render() {
    const { currentLocale, currentTheme, appStarted, ...rest } = this.props;
    const others = omit(['setViewport'], rest);

    return (
      <ThemeProvider theme={themes[currentTheme] || themes.light}>
        <Measure onMeasure={this.handleOnResize}>
          <Container fullHeight>
            <Helmet
              htmlAttributes={{
                lang: currentLocale,
                class: currentTheme ? `${currentTheme} theme` : '',
              }}
            />
            <AppLoader />
            {appStarted && <Routing {...others} />}
          </Container>
        </Measure>
      </ThemeProvider>
    );
  }
}

export default connect(
  (state: State) => ({
    currentTheme: state.app.currentTheme,
    currentLocale: state.app.currentLocale,
    appStarted: state.app.started,
  }),
  { setViewport },
)(start(AppCore));
