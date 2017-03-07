import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import debounce from 'lodash/debounce';
import { autobind } from 'core-decorators';
import type { State } from '../../common/types';
import { Container } from '../../lib/fui/react';
import start from '../../common/app/start';
import { ThemeProvider } from '../../common/app/components';
import * as themes from './themes';
import { setWindowSize } from '../../common/app/actions';
import '../../lib/fui/fui.scss';

type Props = {
  currentLocale: string,
  currentTheme: string,
  setWindowSize: Function,
};

export class AppCore extends React.Component {
  props: Props;
  static DEBOUNCE_TIME = 300;
  static debouncedResize = null;

  constructor(props: Props) {
    super(props);

    this.resizeRegistered = false;
  }

  @autobind
  handleOnResize() {
    const width = window.innerWidth ||
      document.documentElement.clientWidth || document.body.clientHeight;
    const height = window.innerHeight ||
      document.documentElement.clientHeight || document.body.clientHeight;
    this.props.setWindowSize(width, height);
  }

  componentDidMount() {
    if (!AppCore.debouncedResize) {
      AppCore.debouncedResize = debounce(this.handleOnResize, AppCore.DEBOUNCE_TIME);
      window.addEventListener('resize', AppCore.debouncedResize, false);
      this.resizeRegistered = true;
    }
  }

  componentWillUnmount() {
    if (this.resizeRegistered) {
      window.removeEventListener('resize', AppCore.debouncedResize);
    }
  }

  render() {
    const { currentLocale, currentTheme } = this.props;
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
  }
}

export default connect(
  (state: State) => ({
    currentTheme: state.app.currentTheme,
    currentLocale: state.app.currentLocale,
  }),
  { setWindowSize },
)(start(AppCore));
