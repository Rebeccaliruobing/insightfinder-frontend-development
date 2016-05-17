/*
 * Details
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import {Accordion} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';

const ProjectDetails = class extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      summary: [[]]
    }
  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }
    
  render() {
    let {project} = this.props;
    
    return (
      <div className="ui vertical segment">
        <h4 className="ui header">{project}</h4>
        <div className="ui grid">
          <div className="twelve wide column">
            <Accordion>
              <div className="title active">
                <i className="dropdown icon"/>
                Summary
              </div>
              <div className="content active">
                <Dygraph data={[[1,10], [2,20], [3,50], [4,70]]} 
                         labels={['x', 'y']}
                         style={{height: 150}}/>
              </div>
            </Accordion>
            <Accordion>
              <div className="title active">
                <i className="dropdown icon"/>
                 Network Group1
              </div>
              <div className="content active">
                <Dygraph data={[[1,10], [2,20], [3,50], [4,70]]} 
                         labels={['x', 'y']}
                         style={{height: 150}}/>
              </div>
            </Accordion>
            <Accordion>
              <div className="title active">
                <i className="dropdown icon"/>
                Network Group2
              </div>
              <div className="content active">
                <Dygraph data={[[1,10], [2,20], [3,50], [4,70]]} 
                         labels={['x', 'y']}
                         style={{height: 150}}/>
              </div>
            </Accordion>
            <Accordion>
              <div className="title active">
                <i className="dropdown icon"/>
                Network Group3
              </div>
              <div className="content active">
                <Dygraph data={[[1,10], [2,20], [3,50], [4,70]]} 
                         labels={['x', 'y']}
                         style={{height: 150}}/>
              </div>
            </Accordion>
          </div>
          <div className="four wide column">
            <Accordion className="ui styled fluid accordion" exclusive={true}>
              <div className="title">
                <i className="dropdown icon"/>
                A: CPU usuage
              </div>
              <div className="content">
                <div className="ui threaded comments">
                  <div className="comment">
                    <div className="content">
                      <a className="author">Matt</a>
                      <div className="metadata">
                        <span className="date">Today at 5:42PM</span>
                      </div>
                      <div className="text">
                        Do something!
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <div className="content">
                      <a className="author">Jacob</a>
                      <div className="metadata">
                        <span className="date">Today at 6:02PM</span>
                      </div>
                      <div className="text">
                        Fixed!
                      </div>
                    </div>
                  </div>
                  <form className="ui reply form">
                    <div className="field">
                      <textarea rows="3"></textarea>
                    </div>
                    <div className="ui blue labeled submit icon button">
                      <i className="icon edit"></i> Add Reply
                    </div>
                  </form>
                </div>
              </div>
              <div className="title">
                <i className="dropdown icon"/>
                B: Network
              </div>
              <div className="content">
                <div className="ui threaded comments">
                  <div className="comment">
                    <div className="content">
                      <a className="author">Matt</a>
                      <div className="metadata">
                        <span className="date">Today at 5:42PM</span>
                      </div>
                      <div className="text">
                        Do something!
                      </div>
                    </div>
                  </div>
                  <form className="ui reply form">
                    <div className="field">
                      <textarea rows="3"></textarea>
                    </div>
                    <div className="ui blue labeled submit icon button">
                      <i className="icon edit"></i> Add Reply
                    </div>
                  </form>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    )
  }
};

export default ProjectDetails;