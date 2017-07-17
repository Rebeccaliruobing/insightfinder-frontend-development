/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import { get } from 'lodash';
import { autobind } from 'core-decorators';

import { Table, Column, AutoSizer, Container } from '../../../../lib/fui/react';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
};

class LogEpisodeWordSetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.wordsStateKey = 'words';
    this.episodesStateKey = 'episodes';
    this.submitLoadingKey = 'settings_episodeword_submit';

    this.checkboxCellRender = ({ dataKey, rowData, cellData }) =>
      <input
        className="fui input"
        type="checkbox"
        checked={cellData || false}
        onChange={this.handleInputChanged(rowData, dataKey)}
      />;

    const words = get(this.props, ['data', this.wordsStateKey], []);
    const episodes = get(this.props, ['data', this.episodesStateKey], []);

    this.localWords = R.clone(words);
    this.localEpisodes = R.clone(episodes);

    const wordsChecked = !R.find(m => !m.selected, this.localWords);
    const episodesChecked = !R.find(m => !m.selected, this.localEpisodes);

    this.state = {
      currentTab: 'episodes',
      isAllWords: wordsChecked,
      isAllEpisodes: episodesChecked,
    };
  }

  componentWillReceiveProps(newProps) {
    const words = get(newProps, ['data', this.wordsStateKey], []);
    const episodes = get(newProps, ['data', this.episodesStateKey], []);
    // If metrics changes, reset the changed state, and get an new clone.
    if (!R.identical(words, get(this.props, ['data', this.wordsStateKey]))) {
      this.localWords = R.clone(words);
      this.localEpisodes = R.clone(episodes);

      const wordsChecked = !R.find(m => !m.selected, this.localWords);
      const episodesChecked = !R.find(m => !m.selected, this.localEpisodes);

      this.setState({
        isAllWords: wordsChecked,
        isAllEpisodes: episodesChecked,
      });
    }
  }

  @autobind
  handleInputChanged(rowData, dataKey) {
    return e => {
      const target = e.target;
      const newVal = target.type === 'checkbox' ? target.checked : target.value || '';

      // Save the data and force update.
      rowData[dataKey] = newVal;
      this.tableEpisodes.forceUpdateGrid();
      this.tableWords.forceUpdateGrid();
    };
  }

  @autobind
  selectTab(e, name) {
    this.setState({ currentTab: name });
  }

  @autobind
  handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const wordsIds = R.map(
      m => parseInt(m.index.trim(), 10),
      R.filter(w => w.selected, this.localWords),
    );
    const episodesIds = R.map(
      m => parseInt(m.index.trim(), 10),
      R.filter(e => e.selected, this.localEpisodes),
    );

    saveProjectSettings(
      projectName,
      { interestingWordIndicies: wordsIds, interestingEpisodeIndicies: episodesIds },
      { [this.submitLoadingKey]: true },
    );
  }

  @autobind
  handleWordsAllChecked(e) {
    const checked = e.target.checked;

    R.forEach(m => {
      m.selected = checked;
    }, this.localWords);
    this.setState({ isAllWords: checked });
  }
  @autobind
  handleEpisodesAllChecked(e) {
    const checked = e.target.checked;

    R.forEach(m => {
      m.selected = checked;
    }, this.localEpisodes);
    this.setState({ isAllEpisodes: checked });
  }

  render() {
    const { intl } = this.props;
    const hasError = false;
    const words = this.localWords;
    const episodes = this.localEpisodes;

    const { currentTab } = this.state;
    const showWords = currentTab === 'words';
    const showEpisodes = currentTab === 'episodes';
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    const checkAllWordsHeaderRender = () => {
      const { isAllWords } = this.state;
      return (
        <div>
          <span>Interesting</span>
          <input
            className="fui input"
            type="checkbox"
            checked={isAllWords}
            onChange={this.handleWordsAllChecked}
          />
        </div>
      );
    };
    const checkAllEpisodesHeaderRender = () => {
      const { isAllEpisodes } = this.state;
      return (
        <div>
          <span>Interesting</span>
          <input
            className="fui input"
            type="checkbox"
            checked={isAllEpisodes}
            onChange={this.handleEpisodesAllChecked}
          />
        </div>
      );
    };

    return (
      <Container fullHeight className="overflow-y-auto">
        <form
          className={`ui ${hasError ? 'error' : ''} form flex-col full-height`}
          style={{ fontSize: 12, width: 800 }}
        >
          <div className="field" style={{ textAlign: 'right', marginBottom: 0 }}>
            <div
              className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError
                ? 'disabled'
                : ''} blue`}
              style={{ width: 180 }}
              {...(isSubmitting || hasError ? {} : { onClick: this.handleSaveClick })}
            >
              Submit
            </div>
          </div>
          <div className="ui pointing secondary menu" style={{ margin: 0 }}>
            <a
              className={`${currentTab === 'episodes' ? 'active ' : ''}item`}
              onClick={e => this.selectTab(e, 'episodes')}
            >
              Frequent Episode List
            </a>
            <a
              className={`${currentTab === 'words' ? 'active ' : ''}item`}
              onClick={e => this.selectTab(e, 'words')}
            >
              Word List
            </a>
          </div>
          <Container className="flex-grow field" style={showWords ? {} : { display: 'none' }}>
            <AutoSizer>
              {({ width, height }) =>
                <Table
                  className="with-border"
                  width={width}
                  height={height}
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={words.length}
                  rowGetter={({ index }) => words[index]}
                  ref={c => {
                    this.tableWords = c;
                  }}
                >
                  <Column
                    width={600}
                    className="no-wrap"
                    flexGrow={1}
                    label="Words List"
                    dataKey="pattern"
                  />
                  <Column
                    width={100}
                    className="text-right"
                    headerClassName="text-right"
                    label="Count"
                    dataKey="count"
                  />
                  <Column
                    width={100}
                    headerClassName="text-center"
                    className="text-center"
                    label="Interesting"
                    dataKey="selected"
                    headerRenderer={checkAllWordsHeaderRender}
                    cellRenderer={this.checkboxCellRender}
                  />
                </Table>}
            </AutoSizer>
          </Container>
          <Container className="flex-grow field" style={showEpisodes ? {} : { display: 'none' }}>
            <AutoSizer>
              {({ width, height }) =>
                <Table
                  className="with-border"
                  width={width}
                  height={height}
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={episodes.length}
                  rowGetter={({ index }) => episodes[index]}
                  ref={c => {
                    this.tableEpisodes = c;
                  }}
                >
                  <Column
                    width={600}
                    className="no-wrap"
                    flexGrow={1}
                    label="Frequent Episode List"
                    dataKey="pattern"
                  />
                  <Column
                    width={100}
                    headerClassName="text-right"
                    className="text-right"
                    label="Count"
                    dataKey="count"
                  />
                  <Column
                    width={100}
                    headerClassName="text-center"
                    className="text-center"
                    label="Interesting"
                    dataKey="selected"
                    headerRenderer={checkAllEpisodesHeaderRender}
                    cellRenderer={this.checkboxCellRender}
                  />
                </Table>}
            </AutoSizer>
          </Container>
        </form>
      </Container>
    );
  }
}

export default LogEpisodeWordSetting;
