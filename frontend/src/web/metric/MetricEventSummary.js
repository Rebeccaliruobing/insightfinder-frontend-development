/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { autobind } from 'core-decorators';

import { appFieldsMessages, appMenusMessages } from '../../common/app/messages';
import { parseQueryString, buildMatchLocation, getStartEndTimeRange } from '../../common/utils';
import { loadMetricEventSummary } from '../../common/metric/actions';
import { Container, Select } from '../../lib/fui/react';
import { State } from '../../common/types';

type Props = {
  match: Object,
  location: Object,
  intl: Object,
  push: Function,
  projects: Array<Object>,
  loadMetricEventSummary: Function,
};

class MetricEventSummaryCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.defaultInstanceGroup = 'All';
    this.views = ['detect', 'predict'];
    this.defaultNumberOfDays = 7;
    this.dateFormat = 'YYYY-MM-DD';

    this.pickNotNil = R.pickBy(a => !R.isNil(a));
    this.ifIn = (i, items) => items.indexOf(i) !== -1;
  }

  componentDidMount() {
    if (!this.applyParamsAndRedirect(this.props)) {
      this.reloadData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.applyParamsAndRedirect(nextProps)) {
      this.reloadData(nextProps);
    }
  }

  applyParamsAndRedirect(props) {
    const { location, match, push, projects } = props;
    const params = parseQueryString(location.search);
    let { projectName, startTime, endTime, instanceGroup, view } = params;
    let redirect = false;

    // The project name might be emtpy, which will be handled by epic.
    if (!projectName && projects.length > 0) {
      projectName = projects[0].projectName;
    }

    // If project changed, reset instanceGroup and view.
    if (projectName !== params.projectName) {
      view = this.views[0];
      instanceGroup = this.defaultInstanceGroup;
    }

    // Limit start/end time in n days.
    const timeRange = getStartEndTimeRange(
      startTime,
      endTime,
      this.defaultNumberOfDays,
      this.dateFormat,
    );
    startTime = timeRange.startTime;
    endTime = timeRange.endTime;

    instanceGroup = instanceGroup || this.defaultInstanceGroup;
    view = view && this.ifIn(view, this.views) ? view : this.views[0];

    const newParams = { projectName, startTime, endTime, instanceGroup, view };
    if (!R.equals(this.pickNotNil(params), this.pickNotNil(newParams))) {
      redirect = true;
      push(buildMatchLocation(match, {}, newParams));
    }

    return redirect;
  }

  reloadData(props, force = false) {
    const { location, eventSummaryParams, loadMetricEventSummary } = props;
    const params = parseQueryString(location.search);
    const { projectName, instanceGroup, startTime, endTime, view } = params;

    // Get the stored params for the view to compare with current params.
    const storedParams = get(eventSummaryParams, view);

    let refresh = force;
    if (!refresh) {
      // If params are different, need to reload the data
      refresh = !R.equals(this.pickNotNil(storedParams), R.omit(['view'], params));
    }

    if (refresh) {
      loadMetricEventSummary(projectName, { instanceGroup, startTime, endTime, view }, true);
    }
  }

  @autobind
  handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    // Reset the instanceGroup and view to default
    const instanceGroup = this.defaultInstanceGroup;
    const view = this.views[0];
    push(buildMatchLocation(match, {}, { ...params, projectName, instanceGroup, view }));
  }

  render() {
    const { intl, projects } = this.props;
    const params = parseQueryString(location.search);
    const { projectName, startTime, endTime, instanceGroup, view } = params;

    return (
      <Container fullHeight withGutter className="flex-col metric-analysis">
        <Container breadcrumb>
          <div className="section">
            <span className="label">
              {intl.formatMessage(appMenusMessages.metricAnalysis)}
            </span>
            <span className="divider">/</span>
            <Select
              name="project"
              inline
              style={{ width: 200 }}
              options={R.map(p => ({ label: p.projectName, value: p.projectName }), projects)}
              value={projectName}
              onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
            />
          </div>
        </Container>
      </Container>
    );
  }
}

const MetricEventSummary = injectIntl(MetricEventSummaryCore);
export default connect(
  (state: State) => {
    const { projects, eventSummaryParams } = state.app;
    return {
      projects: R.filter(p => p.isMetric, projects),
      eventSummaryParams,
    };
  },
  { push, loadMetricEventSummary },
)(MetricEventSummary);
