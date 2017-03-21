import React from 'react';
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
  appStarted: bool,
  currentLocale: string,
  currentTheme: string,
  viewport: Object,
  setViewport: Function,
};

// TODO: Listen scrolling event and save position into redux store.
export class AppCore extends React.Component {
  props: Props;

  @autobind
  @debounce(300)
  handleOnResize(dimensions) {
    const { appStarted } = this.props;
    if (appStarted) {
      const { width, height } = dimensions;
      const { width: currentWidth, height: currentHeight } = this.props.viewport;
      if (width !== currentWidth || height !== currentHeight) {
        this.props.setViewport(width, height);
      }
    }
  }

  render() {
    const { currentLocale, currentTheme, appStarted,
      viewport, setViewport, ...rest } = this.props;

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
            {appStarted && <Routing {...rest} />}
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
    viewport: state.app.viewport,
    appStarted: state.app.started,
  }),
  { setViewport },
)(start(AppCore));
