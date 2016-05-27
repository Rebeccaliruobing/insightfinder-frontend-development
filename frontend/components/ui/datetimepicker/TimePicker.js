'use strict';

function toTimePartString(timepart) {
  var s = timepart.toString();
  if (s.length === 1) {
    return '0' + s;
  } else {
    return s;
  }
}

var TimePicker = React.createClass({
  displayName: 'TimePicker',

  render: function render() {
    return React.createElement(
      'div',
      {className: 'time-picker'},
      React.createElement(
        'div',
        {className: 'hours'},
        React.createElement(
          'span',
          null,
          "Hour: "
        ),
        React.createElement(
          'span',
          null,
          toTimePartString(this.getHours())
        ),
        React.createElement('input', {
          id: 'hours',
          type: 'range',
          ref: 'hours',
          min: 0,
          max: 23,
          value: this.getHours(),
          onChange: this._handleChange,
          style: {width: '100%'}
        })
      ),
      React.createElement(
        'div',
        {className: 'minutes'},
        React.createElement(
          'span',
          null,
          "Minute: "
        ),
        React.createElement(
          'span',
          null,
          toTimePartString(this.getMinutes())
        ),
        React.createElement('input', {
          id: 'minutes',
          type: 'range',
          ref: 'minutes',
          min: 0,
          max: 59,
          value: this.getMinutes(),
          onChange: this._handleChange,
          style: {width: '100%'}
        })
      )
    );
  },

  getHours: function getHours() {
    return Math.floor(this.props.minutes / 60);
  },

  getMinutes: function getMinutes() {
    return this.props.minutes % 60;
  },

  _handleChange: function _handleChange() {
    var hours = parseInt(ReactDOM.findDOMNode(this.refs.hours).value, 10);
    var minutes = parseInt(ReactDOM.findDOMNode(this.refs.minutes).value, 10);

    this.props.onChange(hours * 60 + minutes);
  }
});

export default  TimePicker;