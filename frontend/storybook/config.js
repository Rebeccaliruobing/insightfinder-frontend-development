import { configure } from '@kadira/storybook';

const req = require.context('../src/', true, /.story.js$/);

const loadStories = () => {
  req.keys().forEach(fileName => req(fileName));
};

configure(loadStories, module);
