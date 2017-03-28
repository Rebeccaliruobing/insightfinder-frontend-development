/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import type { State } from '../types';
import { appStart } from './actions';

type Props = {
  appStart: Function,
  appStarted: bool,
  currentLocale: string,
  messages: Object,
}

const start = (
  WrappedComponent: Function,
  IntlTextComponent?: any,
): any => {
  class Start extends React.Component {
    props: Props;

    componentDidMount() {
      if (!this.props.appStarted) {
        this.props.appStart();
      }
    }

    componentWillUnmount() {
      // When HMR is enabled, code change might cause this component to be
      // reload, to avoid the state changing, we don't dispatch appStop action.
    }

    render() {
      const { messages, appStart, ...rest } = this.props;
      // The currentLocale, appStarted props needs to pass to the inner component.
      const { currentLocale } = this.props;

      return (
        <IntlProvider
          key={currentLocale}
          locale={currentLocale}
          messages={messages[currentLocale] || messages.en}
          {...IntlTextComponent ? { textComponent: IntlTextComponent } : {}}
        >
          <WrappedComponent {...rest} />
        </IntlProvider>
      );
    }
  }

  Start = connect(
    (state: State) => ({
      currentLocale: state.app.currentLocale,
      messages: state.app.messages,
      appStarted: state.app.started,
    }),
    { appStart },
  )(Start);

  return Start;
};

export default start;
