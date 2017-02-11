/* @flow */

export const messagesToCode = (messages: Array<Object>) => {
  messages.sort((a, b) => a.id.localeCompare(b.id));
  const messagesString = JSON
    .stringify(messages, null, 2)
    // Add trailing commas.
    .replace(/\n {2}\}/g, ',\n  }')
    .replace(/\}\n]/g, '},\n]');

  return `/* eslint-disable max-len, quote-props, quotes */
export default ${messagesString};
`;
};

export const diff = (a: Array<Object>, b: Array<Object>) =>
  a.filter(item => b.indexOf(item) === -1);
