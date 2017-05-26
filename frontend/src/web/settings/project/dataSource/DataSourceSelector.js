import React from 'react';
import R from 'ramda';
import { get } from 'lodash';
import { Select, Box, Tile } from '../../../../lib/fui/react';
import dataSourcesMetadata from './dataSourcesMetadata';

type Props = {
  className: string,
  intl: Object,
}

class DataSourceSelector extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      selectedOs: null,
      selectedSystem: null,
      selectedApplication: null,
    };
  }

  render() {
    const { className } = this.props;
    const { selectedOs, selectedSystem, selectedApplication } = this.state;
    const dataSources = dataSourcesMetadata;

    return (
      <div className={`${className} flex-col`}>
        <div className="flex-row" style={{ marginBottom: '1em' }}>
          <div className="flex-grow" style={{ paddingRight: '1em' }}>
            <div style={{ fontSize: 14, lineHeight: '28px', fontWeight: 500 }}>OS:</div>
            <Select
              value={selectedOs} clearable
              onChange={obj => this.setState({ selectedOs: get(obj, 'value', null) })}
              options={[
                { label: 'Linux', value: 'Linux' },
                { label: 'Windows', value: 'Windows' },
              ]}
            />
          </div>
          <div className="flex-grow" style={{ paddingRight: '1em' }}>
            <div style={{ fontSize: 14, lineHeight: '28px', fontWeight: 500 }}>Platform:</div>
            <Select
              value={selectedSystem} clearable
              onChange={obj => this.setState({ selectedSystem: get(obj, 'value', null) })}
              options={[
                { label: 'AWS Cloud', value: 'AWS Cloud' },
                { label: 'Google Cloud', value: 'Google Cloud' },
                { label: 'Kubernetes', value: 'Kubernetes' },
                { label: 'Docker', value: 'Docker' },
                { label: 'VMWare', value: 'VMWare' },
              ]}
            />
          </div>
          <div className="flex-grow">
            <div style={{ fontSize: 14, lineHeight: '28px', fontWeight: 500 }}>Application:</div>
            <Select
              value={selectedApplication} clearable
              onChange={obj => this.setState({ selectedApplication: get(obj, 'value', null) })}
              options={[
                { label: 'Spark', value: 'Spark' },
                { label: 'Hadoop', value: 'Hadoop' },
                { label: 'ELK', value: 'ELK' },
                { label: 'Splunk', value: 'Splunk' },
                { label: 'Kafka', value: 'Kafka' },
              ]}
            />
          </div>
        </div>
        <Box className="flex-grow overflow-y-auto" style={{ padding: '0.5em' }}>
          <Tile isParent isFluid style={{ padding: 0 }}>
            {
              R.map(([name, desc, ruleStr]) => {
                // If not select any filters, show all data sources.
                let match = !selectedOs && !selectedSystem && !selectedApplication;
                if (!match) {
                  // If no match rule, or it's incorrect format, just ignore this data source.
                  // The rule has format like: os,system,application, can use * to match all.
                  const rules = (ruleStr || '').split(',');
                  if (rules.length === 3) {
                    const [os, system, application] = rules;
                    match =
                      ((!!selectedOs && (os === selectedOs || os === '*')) || !selectedOs) &&
                      ((!!selectedSystem && (system === selectedSystem || system === '*')) || !selectedSystem) &&
                      ((!!selectedApplication && (application === selectedApplication || application === '*')) || !selectedApplication);
                  }
                }

                if (!match) return null;
                return (
                  <Tile size={6} key={name}>
                    <Box
                      className="hoverable"
                      style={{ margin: '0 0.5em', padding: '0.5em', width: '100%', borderWidth: 0, borderBottomWidth: 1 }}
                    >
                      <div className="ui fitted checkbox" style={{ float: 'left', marginTop: 4 }}>
                        <input type="checkbox" /><label />
                      </div>
                      <div style={{ paddingLeft: 28 }}>
                        <div className="name">{name}</div>
                        <div className="desc">{desc}</div>
                      </div>
                    </Box>
                  </Tile>
                );
              }, dataSources)
            }
          </Tile>
        </Box>
      </div>
    );
  }
}

export default DataSourceSelector;
