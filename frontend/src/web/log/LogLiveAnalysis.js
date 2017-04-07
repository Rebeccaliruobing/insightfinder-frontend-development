import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import VLink from 'valuelink';
import { Container, Select } from '../../lib/fui/react';
import { State } from '../../common/types';
import { hideAppLoader } from '../../common/app/actions';

type Props = {
  projects: Array<Object>,
  match: Object,
  hideAppLoader: Function,
};

class LogLiveAnalysis extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    const { match, projects } = props;
    const { projectName } = match.params;
    this.state = {
      currentProject: R.find(p => p.name === projectName)(projects) || {},
    };
  }

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    const { projects } = this.props;
    const currentProjectLink = VLink.state(this, 'currentProject');
    return (
      <Container fullHeight withGutter>
        <Container toolbar>
          <div className="ui breadcrumb">
            <span className="label">Project :</span>
            <Select
              name="project" style={{ width: 100 }}
              autosize={false} clearable={false}
              valueLink={currentProjectLink} options={projects}
            />
          </div>
          <div className="inline-block">fdfsd</div>
          <div className="float-right inline-block">fdfsd</div>
        </Container>
      </Container>
    );
  }
}

export default connect(
  (state: State) => ({
    projects: R.map(p => ({ value: p.name, label: p.name }),
      R.filter(p => p.hasLogData, state.app.projects)),
  }),
  { hideAppLoader },
)(LogLiveAnalysis);
