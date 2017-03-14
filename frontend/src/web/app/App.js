import React from 'react';
import { omit } from 'ramda';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { autobind, debounce } from 'core-decorators';
import { Container } from '../../lib/fui/react';
import type { State } from '../../common/types';
import start from '../../common/app/start';
import { ThemeProvider } from '../../common/app/components';
import { setWindowSize } from '../../common/app/actions';
import Routing from './Routing';
import AppLoader from './AppLoader';
import * as themes from './themes';
import '../../lib/fui/fui.scss';

type Props = {
  currentLocale: string,
  currentTheme: string,
  appStarted: bool,
  setWindowSize: Function,
};

// TODO: Listen scrolling event and save position into redux store.
export class AppCore extends React.Component {
  props: Props;

  // Use the static member to keep only one instance register the resize event.
  static registeredInstance = null;

  @autobind
  @debounce(300)
  handleOnResize() {
    const width = window.innerWidth ||
      document.documentElement.clientWidth || document.body.clientHeight;
    const height = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    this.props.setWindowSize(width, height);
  }

  componentDidMount() {
    if (!AppCore.registeredInstance) {
      AppCore.registeredInstance = this;
      window.addEventListener('resize', this.handleOnResize, false);
    }
  }

  componentWillUnmount() {
    if (AppCore.registeredInstance === this) {
      window.removeEventListener('resize', this.handleOnResize);
    }
  }

  render() {
    const { currentLocale, currentTheme, appStarted, ...rest } = this.props;
    const others = omit(['setWindowSize'], rest);

    return (
      <ThemeProvider theme={themes[currentTheme] || themes.light}>
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
  { setWindowSize },
)(start(AppCore));
