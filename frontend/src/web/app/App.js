import React from 'react';
import { autobind, debounce } from 'core-decorators';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import Measure from 'react-measure';
import { Container } from '../../lib/fui/react';
import type { State, ErrorMessage } from '../../common/types';
import { ThemeProvider } from '../../common/app/components';
import { appStart, appStop, setViewport } from '../../common/app/actions';
import Routing from './Routing';
import AppLoader from './AppLoader';
import AppFatalError from './AppFatalError';
import * as themes from './themes';
import './app.scss';

type Props = {
  appStarted: bool,
  appLoaderVisible: bool,
  messages: Object,
  appFatalError: ?ErrorMessage,
  currentLocale: string,
  currentTheme: string,
  viewport: Object,
  appStart: Function,
  appStop: Function,
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

  componentDidMount() {
    if (!this.props.appStarted) {
      this.props.appStart();
    }
  }

  componentWillUnmount() {
    if (this.props.appStarted) {
      this.props.appStop();
    }
  }

  render() {
    const { currentLocale, currentTheme, appStarted, messages,
      appLoaderVisible, appFatalError } = this.props;

    const { message, error } = appFatalError || {};

    return (
      <IntlProvider
        key={currentLocale} locale={currentLocale}
        messages={messages[currentLocale] || messages.en}
      >
        <ThemeProvider theme={themes[currentTheme] || themes.light}>
          <Measure onMeasure={this.handleOnResize}>
            <Container fullHeight>
              <Helmet
                htmlAttributes={{
                  lang: currentLocale,
                  class: currentTheme ? `${currentTheme} theme` : '',
                }}
              />
              <AppFatalError message={message} error={error} />
              <AppLoader visible={appLoaderVisible} />
              {appStarted && <Routing />}
            </Container>
          </Measure>
        </ThemeProvider>
      </IntlProvider >
    );
  }
}

export default connect(
  (state: State) => ({
    messages: state.app.messages,
    currentTheme: state.app.currentTheme,
    currentLocale: state.app.currentLocale,
    viewport: state.app.viewport,
    appStarted: state.app.started,
    appLoaderVisible: state.app.appLoaderVisible,
    appInited: state.app.inited,
    appFatalError: state.app.fatalError,
  }),
  { setViewport, appStart, appStop },
)(AppCore);
