import React from 'react';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.selectTab.bind(this);
    this._el = null;
    
    this.state = {
      tabStates: {
        basic: 'active',
        summary: '',
        details: ''
      }
    }
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function(val){ return ''; });
    tabStates[tab] = 'active';
    this.setState({tabStates: tabStates});
  }
  
  componentDidMount(){
    if (this._el) {
    }
  }

  render() {
    let {name} = this.props;
    var tabStates = this.state['tabStates'];

    return (
      <div className="ui segment attached" ref={c => this._el = c}>
        <div className="ui segments">
          <div className="ui orange ribbon label">{name}</div>
          <div className="ui top attached tabular menu">
            <a className={tabStates['basic'] + ' item'}
               onClick={(e) => this.selectTab(e, 'basic')}>Basic Metric</a>
            <a className={tabStates['summary'] + ' item'}
               onClick={(e) => this.selectTab(e, 'summary')}>Anomaly Summary</a>
            <a className={tabStates['details'] + ' item'}
               onClick={(e) => this.selectTab(e, 'details')}>Anomaly Details</a>
            <div className="right menu" style={{fontSize:10, lineHeight:11}}>
              <div className="item"
                   style={{display:'block', padding:0, paddingRight:10, textAlign:'right'}}>
                <div><b>Anomaly Series</b>:</div>
                <div><b>Time</b>:</div>
              </div>
              <div className="item" style={{display:'block', padding:0}}>
                <div>[1, 24, 0, 2]</div>
                <div>{new Date().toISOString()}</div>
              </div>
            </div>
          </div>
          { tabStates['basic'] === 'active' &&
          <div className='ui bottom attached segment'>
            <table className="ui small table">
              <thead><tr>
                <th>Metric</th>
                <th>Instance Id</th>
                <th>Min</th>
                <th>Max</th>
                <th>Avg</th>
                <th>Std</th>
                <th>Number of Missing Samples</th>
                <th>Anomaly Relevance Score</th>
                <th>Status</th>
              </tr></thead>
              <tbody>
              <tr>
                <td>NetworkIn (MB)</td>
                <td>i-d475ea6b</td>
                <td>5.722E-5</td>
                <td>0.00325</td>
                <td>7.117E-4</td>
                <td>0.00127</td>
                <td>0</td>
                <td>100.0</td>
                <td style={{backgroundColor:'red'}}></td>
              </tr>
              <tr>
                <td>CPUUtilization (%)</td>
                <td>i-d475ea6b</td>
                <td>5.722E-5</td>
                <td>0.00325</td>
                <td>7.117E-4</td>
                <td>0.00127</td>
                <td>0</td>
                <td>100.0</td>
                <td style={{backgroundColor:'red'}}></td>
              </tr>
              <tr>
                <td>NetworkOut (MB)</td>
                <td>i-d475ea6b</td>
                <td>5.722E-5</td>
                <td>0.00325</td>
                <td>7.117E-4</td>
                <td>0.00127</td>
                <td>0</td>
                <td>100.0</td>
                <td style={{backgroundColor:'red'}}></td>
              </tr>
              <tr>
                <td>DiskWriteBytes (MB)</td>
                <td>i-d475ea6b</td>
                <td>5.722E-5</td>
                <td>0.00325</td>
                <td>7.117E-4</td>
                <td>0.00127</td>
                <td>0</td>
                <td>100.0</td>
                <td style={{backgroundColor:'green'}}></td>
              </tr>
              <tr>
                <td>DiskWriteOps (# of Ops)</td>
                <td>i-d475ea6b</td>
                <td>5.722E-5</td>
                <td>0.00325</td>
                <td>7.117E-4</td>
                <td>0.00127</td>
                <td>0</td>
                <td>100.0</td>
                <td style={{backgroundColor:'green'}}></td>
              </tr>
              <tr>
                <td>DiskReadOps (# of Ops)</td>
                <td>i-d475ea6b</td>
                <td>5.722E-5</td>
                <td>0.00325</td>
                <td>7.117E-4</td>
                <td>0.00127</td>
                <td>0</td>
                <td>100.0</td>
                <td style={{backgroundColor:'green'}}/>
              </tr>
              </tbody>
            </table>
          </div>
          }
          { tabStates['summary'] === 'active' &&
          <div className='ui bottom attached segment'>
            <table className="ui small table">
              <thead><tr>
                <th>ID</th>
                <th>Start Time</th>
                <th>Duration (min)</th>
                <th>Avg Anomaly Degree</th>
                <th>Status</th>
              </tr></thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>2016-04-05 06:48 (GMT)</td>
                <td>10</td>
                <td>39.4</td>
                <td style={{backgroundColor:'red'}}/>
              </tr>
              <tr>
                <td>2</td>
                <td>2016-04-05 06:48 (GMT)</td>
                <td>5</td>
                <td>18.9</td>
                <td style={{backgroundColor:'red'}}/>
              </tr>
              </tbody>
            </table>
          </div>
          }
          { tabStates['details'] === 'active' &&
          <div className='ui bottom attached segment'>
            <table className="ui small table">
              <thead><tr>
                <th>ID</th>
                <th>Details</th>
              </tr></thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div>2016-04-05 06:48 (GMT), Anomaly ratio: 26.83, Fault hints:</div>
                  <ol className="list">
                    <li>NetworkIn[i-d475ea6b](0.227 (MB))</li>
                    <li>CPUUtilization[i-d475ea6b](0.166 (%))</li>
                  </ol>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default Details;

