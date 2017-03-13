import R from 'ramda';

// Convert messages array into a map.
const descriptorsToMessages = descriptors =>
  R.reduce((previous, { defaultMessage, id }) => ({
    ...previous, [id]: defaultMessage,
  }), {})(descriptors || []);

const loadLocaleMessages = () => ({
  en: descriptorsToMessages(require('../../messages/en').default),
  zh: descriptorsToMessages(require('../../messages/zh').default),
});

export default loadLocaleMessages;
