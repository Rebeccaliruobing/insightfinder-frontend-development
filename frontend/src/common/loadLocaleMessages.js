import R from 'ramda';

// Convert messages array into a map.
const descriptorsToMessages = descriptors =>
  R.reduce((previous, { defaultMessage, id }) => ({
    ...previous, [id]: defaultMessage,
  }), {})(descriptors || []);

const loadLocaleMessages = () => ({
  en: {
    name: 'English',
    messages: descriptorsToMessages(require('../../messages/en').default),
  },
  zh: {
    name: '简体中文',
    messages: descriptorsToMessages(require('../../messages/zh').default),
  },
});

export default loadLocaleMessages;
