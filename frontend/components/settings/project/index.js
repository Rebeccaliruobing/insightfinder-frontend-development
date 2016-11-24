import React from 'react';
import ProjectSettings from './settings';
import DataDisqualifiers from './data-disqualifiers';
import './project.less';

const SettingsFor = component => () => (
  <ProjectSettings>{component}</ProjectSettings>
);

export const DataDisqualifiersSettings = SettingsFor(<DataDisqualifiers />);
