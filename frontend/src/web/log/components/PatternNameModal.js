import React from 'react';
import { autobind } from 'core-decorators';
import { get } from 'lodash';
import { Modal } from '../../../../artui/react';
import { Input } from '../../../lib/fui/react';

type Props = {
  newNameLink: Object,
  projectName: String,
  patternName: String,
  incidentId: String,
  viewName: String,
  patternId: String,
  currentLoadingComponents: Object,
  setLogPatternName: Function,
  onClose: Function,
};

class PatternNameModal extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.loadingComponentPath = `log_${props.viewName}_pattern_name`;
    this.sumbitting = false;
  }

  componentDidMount() {
    this.props.newNameLink.set(this.props.patternName);
  }

  componentWillReceiveProps(nextProps) {
    const { currentLoadingComponents } = nextProps;
    const isLoading = get(currentLoadingComponents, this.loadingComponentPath, false);
    if (!isLoading && this.sumbitting) {
      this.sumbitting = false;
      this.modal.close();
    }
  }

  @autobind
  handleSumbit() {
    const {
      projectName,
      incidentId,
      viewName,
      patternId,
      setLogPatternName,
      newNameLink,
    } = this.props;
    this.sumbitting = true;
    setLogPatternName(projectName, incidentId, viewName, patternId, newNameLink.value, {
      [this.loadingComponentPath]: true,
    });
  }

  render() {
    const { newNameLink, onClose, currentLoadingComponents } = this.props;
    const hasError = newNameLink.error;
    const isLoading = get(currentLoadingComponents, this.loadingComponentPath, false);
    return (
      <div>
        <Modal
          ref={c => (this.modal = c)}
          size="tiny"
          closable={false}
          onClose={onClose}
          onCancel={onClose}
        >
          <div className="content">
            <form className={`ui ${hasError ? 'error' : ''} form`}>
              <div className="input field required">
                <label>Pattern Name</label>
                <Input valueLink={newNameLink} />
              </div>
              <div className="field" style={{ fontSize: 12 }}>
                <i className="info icon" />
                <span>Set a name for this pattern to help recognize the logs.</span>
              </div>
            </form>
          </div>
          <div className="actions">
            <div className="ui button deny" onClick={onClose}>
              Cancel
            </div>
            <div className={`ui button labeled ${hasError ? 'disabled' : ''}`}>
              <div
                className={`ui button orange ${isLoading ? 'loading' : ''}`}
                onClick={this.handleSumbit}
              >
                <i className="save icon" />
                <span>Submit</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PatternNameModal;
