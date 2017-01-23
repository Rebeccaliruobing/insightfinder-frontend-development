import React from 'react';
import ProjectSettings from './settings';
import DataDisqualifiers from './data-disqualifiers';
import AlertSensitivity from './alert-sensitivity';
import DataSharing from './data-sharing';
import Grouping from './grouping';
import Threshold from './threshold';
import LogAnalysis from './log-analysis';

import './project.less';

const SettingsFor = component => () => (
  <ProjectSettings>{component}</ProjectSettings>
);

export const DataDisqualifiersSettings = SettingsFor(<DataDisqualifiers />);
export const AlertSensitivitySettings = SettingsFor(<AlertSensitivity />);
export const DataSharingSettings = SettingsFor(<DataSharing />);
export const GroupingSettings = SettingsFor(<Grouping />);
export const ThresholdSettings = SettingsFor(<Threshold />);
export const LogAnalysisSettings = SettingsFor(<LogAnalysis />);
