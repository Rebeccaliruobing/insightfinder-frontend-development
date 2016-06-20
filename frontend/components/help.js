import React from 'react';
import {Console, Link} from '../artui/react/index';

export default class Help extends React.Component {
  render() {
    return (
      <Console.Wrapper className="help-page">
        <div className="ui container">
          <div className="text-center" style={{padding: '0 50px 20px'}}>
            <h2>Welcome!</h2>
            <p>We hope this support page helps answer any questions you may have. We will be glad to receive your
              contributions and suggestions both with respect to the content we outline below and we welcome your
              suggestions of other areas that you feel may need better or more in-depth explanation.</p>
            <p>If you need to get in touch with us, there are several channels available to you. Please choose the most
              appropriate by going to “How Do I Get in touch with you?" FAQs article.
            </p>
          </div>
          <div className="ui grid three columns text-center">
            <div className="column">
              <div className="card">
                <i className="help circle icon"></i>
                <h3>Frequently Asked Questions</h3>
                <a>Who Is Taiga For?</a>
                <a>How do I get in In touch with you, or keep up with the Latest News?</a>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <i className="help circle icon"></i>
                <h3>Frequently Asked Questions</h3>
                <a>Who Is Taiga For?</a>
                <a>How do I get in In touch with you, or keep up with the Latest News?</a>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <i className="help circle icon"></i>
                <h3>Frequently Asked Questions</h3>
                <a>Who Is Taiga For?</a>
                <a>How do I get in In touch with you, or keep up with the Latest News?</a>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <i className="help circle icon"></i>
                <h3>Frequently Asked Questions</h3>
                <a>Who Is Taiga For?</a>
                <a>How do I get in In touch with you, or keep up with the Latest News?</a>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <i className="help circle icon"></i>
                <h3>Frequently Asked Questions</h3>
                <a>Who Is Taiga For?</a>
                <a>How do I get in In touch with you, or keep up with the Latest News?</a>
              </div>
            </div>
          </div>
        </div>
      </Console.Wrapper>
    )
  }
}