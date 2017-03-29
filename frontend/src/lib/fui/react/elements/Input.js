import React from 'react';
import { autobind } from 'core-decorators';
import cx from 'classnames';

const setValue = (x, e) => e.target.value;

type Props = {
  type: string,
  valueLink: Object,
  disableErrorHint: bool,
  className: string,
  icon: string,
}

type States = {
  blurred: bool,
}

class Input extends React.Component {
  props: Props;
  state: States = {
    blurred: false,
  }
  defaultProps = {
    type: 'text',
  }

  @autobind
  handleBlur() {
    this.setState({ blurred: true });
  }

  @autobind
  handleFocus() {
    this.setState({ blurred: false });
  }

  render() {
    const { type, valueLink, disableErrorHint, icon, className, ...rest } = this.props;
    const { blurred } = this.state;
    const hasError = Boolean(valueLink.error);
    const showErrorHints = blurred && hasError && !disableErrorHint;

    // Only change the validation styles when blur.
    const classes = cx(
      'ui', {
        invalid: showErrorHints,
        icon: !!icon,
      },
      className,
      'input',
    );
    return (
      <div className={classes}>
        <input
          {...rest} type={type}
          value={valueLink.value}
          onChange={valueLink.action(setValue)}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        {icon && <i className={icon} />}
        {showErrorHints &&
          <div className="error-text">{valueLink.error}</div>
        }
      </div>
    );
  }
}

export default Input;
