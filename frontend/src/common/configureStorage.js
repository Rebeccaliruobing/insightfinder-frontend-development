/* flow */
import { createTransform } from 'redux-persist';
import { pick } from 'ramda';

 // The paths of the state to persist, only support one level.
// TODO: Support deep level of the state.
const persistPaths = [
  ['app', ['currentTheme', 'currentLocale']],
  ['auth', ['credentials', 'userInfo']],
];

const configureStorage = (
  appName: string,
  storage: Object,
) => {
  const transforms = [];
  const whitelist = [];

  persistPaths.forEach(([feature, props]) => {
    whitelist.push(feature);
    if (!props) return;
    const inOut = state => pick(props, state);
    transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
  });

  return {
    debounce: 100,
    keyPrefix: `${appName}:`,
    storage,
    transforms,
    whitelist,
  };
};

export default configureStorage;
