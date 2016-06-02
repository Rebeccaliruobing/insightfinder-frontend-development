import React from 'react';
import {withRouter} from 'react-router';
import cx from 'classnames';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';

const ProjectDetails = class extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      view: 'four',
      viewText: 4,
      selectedGroup: ''
    }
  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }

  handleHighlight(v){
    return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
  }
  
  handleClick(group) {
    return () => {
      this.setState({selectedGroup: group})
    }
  }
    
  renderNavs() {
    return (
      <Console.Navbar>
        <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
          <div className="item">
            <a className="active title"><i className="dropdown icon"/>List of Charts</a>
            <div className="active content menu">
              <Link to="" className="item">Summary</Link>
              <Link to="" className="item">Metric Group 1</Link>
              <Link to="" className="item">Metric Group 2</Link>
            </div>
          </div>
          <div className="item">
          </div>
        </Accordion>
      </Console.Navbar>
    )
  }

  renderAnnotation() {
    return (
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
                  <span className="date" style={{textAlign: 'text-center'}}>Today at 5:42PM</span>
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
                  <span className="date" style={{textAlign: 'text-center'}}>Today at 6:02PM</span>
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
                  <span className="date" style={{textAlign: 'text-center'}}>Today at 5:42PM</span>
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
    )
  }
  
  renderSelectedGroup() {
    return (
      <div className="ui grid">
        <div className="twelve wide column">
          <Dygraph data={_.range(0, 20).map((item, index)=>[index, Math.random() * 1000, Math.random() * 1000])}
                   labels={['x', 'disk1', 'disk2']}
                   style={{width: '100%'}}
                   highlightCircleSize={2}
                   highlightSeriesOpts={{
                          strokeWidth: 1,
                          strokeBorderWidth: 1,
                          highlightCircleSize: 3
                        }}
                   highlightCallback={this.handleHighlight}/>
        </div>
        <div className="four wide column">
          {this.renderAnnotation()}
        </div>
      </div>
    );
  }

  renderGroups(view) {
    let groups = [
      'Summary',
      'Metric Group 1', 'Metric Group 2', 'Metric Group 3',
      'Metric Group 4', 'Metric Group 5', 'Metric Group 6'
    ];
    let elems = [];

    groups.map((group, index) => {
      elems.push((
        <div key={view + group} className="ui card" onClick={this.handleClick(group)}>
          <div className="content">
            <div className="header">{group}</div>
            <Dygraph data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                     labels={['x', 'y']}
                     style={{height: 150}}
                     highlightCircleSize={2}
                     highlightSeriesOpts={{
                          strokeWidth: 3,
                          strokeBorderWidth: 1,
                          highlightCircleSize: 5
                        }}
                     highlightCallback={this.handleHighlight}/>
          </div>
        </div>
      ));
    });
    return elems;

  }
  
  renderList() {
    let groups = [
      'Summary',
      'Metric Group 1', 'Metric Group 2', 'Metric Group 3',
      'Metric Group 4', 'Metric Group 5', 'Metric Group 6'
    ];
    let elems = [];
    groups.map((group, index) => {
      elems.push((
        <Accordion>
          <div className="content">
            <div className="header">{group}</div>
            <Dygraph data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                     labels={['x', 'y']}
                     style={{height: 150}}
                     showRangeSelector={true}
                     highlightCircleSize={2}
                     highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                     highlightCallback={this.handleHighlight}/>
          </div>
        </Accordion>
      ));
    });
   
    return (
      <div className="ui grid">
        <div className="twelve wide column">
          {elems}
        </div>
        <div className="four wide column">
          {this.renderAnnotation()}
        </div>
      </div>
    )
  }

  render() {
    let {query} = this.props.location;
    let project = query['project'];
    let {view, selectedGroup} = this.state;
    
    let isListView = view === 'list';
    let contentStyle = isListView ? {} : {paddingLeft:0};

    return (
      <Console.Wrapper>
        {isListView && this.renderNavs()}
        <Console.Content style={contentStyle}>
          <div className="ui main tiny container" ref={c => this._el = c}>
            <div className="ui clearing vertical segment">
              <div className="ui vertical segment">
                {project}
                <ButtonGroup className="right floated basic icon">
                  <Dropdown className="compact" 
                            value={this.state['view']} text={this.state['viewText']} 
                            mode="select"
                            onChange={(value, text) => {this.setState({view: value, viewText: text})}}>
                    <div className="menu">
                      <div className="item" data-value="two">2</div>
                      <div className="item" data-value="three">3</div>
                      <div className="item" data-value="four">4</div>
                      <div className="item" data-value="five">5</div>
                      <div className="item" data-value="six">6</div>
                    </div>
                  </Dropdown>
                  <Button active={view == 'list'} onClick={()=>this.setState({view:'list', selectedGroup: ''})}>
                    <i className="list layout icon"/>
                  </Button>
                </ButtonGroup>
              </div>
              <div className="ui vertical segment">
                {view !== 'list' &&
                <div className={cx('ui', view, 'cards')}>
                  {this.renderGroups(view)}
                </div>
                }
                {view == 'list' && this.renderList()}
              </div>
              {!!selectedGroup &&
              <div className="ui vertical segment">
                <h4 className="ui header">{selectedGroup}</h4>
                {this.renderSelectedGroup()}
              </div>
              }
            </div>
          </div>
        </Console.Content>
      </Console.Wrapper>
    )
  }
};

export default ProjectDetails;