/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
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

    this.state = {
      currentTab: 'episodes',
    };
  }

  @autobind selectTab(e, name) {
    this.setState({ currentTab: name });
  }

  @autobind handleSaveClick() {}

  render() {
    const { intl } = this.props;
    const hasError = false;
    const isSubmitting = false;

    const { currentTab } = this.state;
    const words = get(this.props, ['data', this.wordsStateKey], []);
    const episodes = get(this.props, ['data', this.episodesStateKey], []);
    const showWords = currentTab === 'words';
    const showEpisodes = currentTab === 'episodes';

    const booleanCellRender = ({ cellData }) => (cellData ? 'Yes' : 'No');

    return (
      <Container fullHeight className="overflow-y-auto">
        <form
          className={`ui ${hasError ? 'error' : ''} form flex-col full-height`}
          style={{ fontSize: 12, width: 800 }}
        >
          <div className="field" style={{ textAlign: 'right', marginBottom: 0, display: 'none' }}>
            <div
              className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError ? 'disabled' : ''} blue`}
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
          {showWords &&
            <Container className="flex-grow field">
              <AutoSizer>
                {({ width, height }) => (
                  <Table
                    className="with-border"
                    width={width}
                    height={height}
                    headerHeight={40}
                    rowHeight={40}
                    rowCount={words.length}
                    rowGetter={({ index }) => words[index]}
                  >
                    <Column
                      width={600}
                      className="no-wrap"
                      flexGrow={1}
                      label="Pattern"
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
                      cellRenderer={booleanCellRender}
                    />
                  </Table>
                )}
              </AutoSizer>
            </Container>}
          {showEpisodes &&
            <Container className="flex-grow field">
              <AutoSizer>
                {({ width, height }) => (
                  <Table
                    className="with-border"
                    width={width}
                    height={height}
                    headerHeight={40}
                    rowHeight={40}
                    rowCount={episodes.length}
                    rowGetter={({ index }) => episodes[index]}
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
                      cellRenderer={booleanCellRender}
                    />
                  </Table>
                )}
              </AutoSizer>
            </Container>}
        </form>
      </Container>
    );
  }
}

export default LogEpisodeWordSetting;
