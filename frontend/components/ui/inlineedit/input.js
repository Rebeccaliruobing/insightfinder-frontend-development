import React from 'react';
import { autobind } from 'core-decorators';

class InlineEditInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      normalHover: false,
      newValue: this.props.value,
    };
  }

  @autobind
  startEditing(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      editing: true,
      normalHover: false,
    }, () => {
      if (this.textInput) {
        this.textInput.focus();
      }
    });
  }

  @autobind
  finishEditing() {
    const newValue = this.textInput.value;
    if (this.state.newValue !== newValue) {
      this.commit(newValue);
    }
    this.cancelEditing();
  }

  @autobind
  cancelEditing() {
    this.setState({ editing: false });
  }

  @autobind
  handleInputKeyDown(e) {
    if (e.key === 'Enter') {
      this.finishEditing();
    }
  }

  @autobind
  commit(newValue) {
    this.setState({
      newValue,
    }, () => {
      this.props.onChange(newValue);
    });
  }

  @autobind
  handleNormalMouseOver() {
    this.setState({ normalHover: true });
  }

  @autobind
  handelNormalMouseOut() {
    this.setState({ normalHover: false });
  }

  renderNormal() {
    const { value, normalStyle } = this.props;
    const { normalHover, newValue } = this.state;
    return (
      <div
        className="inline-edit"
        onMouseOver={this.handleNormalMouseOver}
        onMouseOut={this.handelNormalMouseOut}
      >
        <span className="text" style={{ ...normalStyle }}>{newValue || value}</span>
        <span
          className="edit"
          style={{ ...normalHover ? {} : { display: 'none' } }}
          onClick={this.startEditing}
        >Edit</span>
      </div>
    );
  }

  renderEditing() {
    return (
      <div className="inline-edit">
        <div className="ui input">
          <input
            type="text"
            ref={(input) => { this.textInput = input; }}
            defaultValue={this.state.newValue || this.props.value}
            onBlur={this.cancelEditing}
            onKeyDown={this.handleInputKeyDown}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.editing) {
      return this.renderEditing();
    }

    return this.renderNormal();
  }
}

export default InlineEditInput;
