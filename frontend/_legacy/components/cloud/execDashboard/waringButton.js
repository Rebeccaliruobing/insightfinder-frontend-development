import React from 'react';
class WaringButton extends React.Component {
    static propTypes = {
        labelTitle: React.PropTypes.string,
        labelSpan: React.PropTypes.string,
        labelStyle: React.PropTypes.object
    };
    static defaultProps = {
        labelStyle: {},
        labelTitle: "",
        labelSpan: ""
    };

  componentDidUpdate() {
      $('.custom.button')
          .popup({
              popup: $('.custom.popup'),
              on: 'click'
          });
  }

    constructor(props) {
        super(props);
    }

    render() {
        let {labelTitle,labelSpan,labelStyle} = this.props;
        return (
            <label style={labelStyle}>
                {labelTitle}&nbsp;

                <i className="custom button warning circle icon" style={{'cursor': 'pointer','color': '#88bbee'}}></i>

                <div className="ui custom popup center right transition hidden">{labelSpan}</div>
            </label>
        )
    }
}
export default WaringButton;