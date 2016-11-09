import React from 'react';
import {autobind} from 'core-decorators';
import shallowCompare from 'react-addons-shallow-compare';
import cx from 'classnames';
import {Modal} from '../../artui/react';
import DataParser from '../cloud/dataparser';
import {DataChart} from '../share/charts';
import apis from '../../apis';

class MetricModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      showErrorMsg: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  calculateData(data, instanceName) {
    const dp = new DataParser(data, instanceName);
    dp.getMetricsData();
    const groups = dp.groupsData;
    return groups && groups.length > 0 ? groups[0] : null;
  }

  componentDidMount() {
    let { projectName, startTimestamp, endTimestamp, instanceName, metricName } = this.props;
    this.setState({ 
      loading: true,
    });
    apis.postProjectData(
      projectName, undefined, undefined, startTimestamp, endTimestamp, undefined,
      instanceName, metricName, undefined)
      .then(resp => {
        if (resp.success) {
          const data = this.calculateData(resp.data, instanceName);
          if(data==null){
            this.setState({ 
              showErrorMsg: true,
              loading: false,
            });
          } else {
            this.setState({ 
              showErrorMsg: false,
              loading: false,
              data 
            });
          }
        } else {
          this.setState({ 
            showErrorMsg: true,
            loading: false,
          });
        }
      })
      .catch(msg=> {
        this.setState({ 
          showErrorMsg: true,
          loading: false,
        });
        console.error(msg);
      });
  }

  render() {
    const { onClose, eventEndTime, eventStartTime, avgLabel } = this.props;
    const { data,showErrorMsg,loading } = this.state;
    const classes = cx('content', loading ? 'ui form loading' : '');
    let chartLabel = '';
    if(avgLabel!=undefined){
      chartLabel = avgLabel;
    }
    return (
      <Modal closable={true} onClose={onClose}>
        {showErrorMsg ?
          <div className={classes} style={{ height: 300 }}>
            <h3>Metric data unavailable for this period.</h3>
          </div>
          :
          <div className={classes} style={{ height: 300 }}>
            {data &&
            <div className="ui header">{`Metric ${data.metrics} ${chartLabel}` }</div>
            }
            {data  &&
            <DataChart data={data}/>
            }
          </div>
        }
      </Modal>
    )
  }
}

export default MetricModal;
