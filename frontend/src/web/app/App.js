import React from 'react';
import { autobind, debounce } from 'core-decorators';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';
import Measure from 'react-measure';
import { Container } from '../../lib/fui/react';
import type { State } from '../../common/types';
import { ThemeProvider } from '../../common/app/components';
import { appStart, appStop, setViewport } from '../../common/app/actions';
import { AppError, AppLoader, AppAlert } from './components';
import Routing from './Routing';
import * as themes from './themes';
import './app.scss';

type Props = {
  history: Object,
  appInited: bool,
  appStarted: bool,
  appLoaderVisible: bool,
  messages: Object,
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
    const { history, currentLocale, currentTheme, appStarted, messages,
      appLoaderVisible, appInited } = this.props;

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
              {!appInited && <AppError />}
              {appInited && <AppAlert />}
              <AppLoader visible={appLoaderVisible} />
              {appStarted && <Routing history={history} />}
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
  }),
  { setViewport, appStart, appStop },
)(AppCore);
