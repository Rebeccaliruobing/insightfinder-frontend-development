/* @flow */
import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import type { State } from '../types';
import { appStart, appStop } from './actions';

type Props = {
  appStart: Function,
  appStop: Function,
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
      this.props.appStart();
    }

    componentWillUnmount() {
      this.props.appStop();
    }

    render() {
      const { currentLocale, messages } = this.props;
      // Omit messages prop which mostly will not used by wrapped component.
      const props = R.omit(['messages'], this.props);

      return (
        <IntlProvider
          key={currentLocale}
          locale={currentLocale}
          messages={messages[currentLocale] || messages.en}
          {...IntlTextComponent ? { textComponent: IntlTextComponent } : {}}
        >
          <WrappedComponent {...props} />
        </IntlProvider>
      );
    }
  }

  Start = connect(
    (state: State) => ({
      currentLocale: state.app.currentLocale,
      messages: state.app.messages,
    }),
    { appStart, appStop },
  )(Start);

  return Start;
};

export default start;
