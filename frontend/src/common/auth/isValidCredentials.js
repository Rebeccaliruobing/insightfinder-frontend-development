/* @flow */
const isValidCredentials = (credentials: Object) => {
  const { userName, token } = credentials || {};
  return userName && token;
};

export default isValidCredentials;
