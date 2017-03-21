/*  @flow */
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

type Params = {
  userName: string,
  password: string,
}

const login = ({ userName, password }: Params) =>
  fetchPost(
    getEndpoint('login-check'),
    {
      userName,
      password,
    },
  ).then(d => ({
    credentials: {
      userName: d.data.userName,
      token: d.token,
    },
    userInfo: d.data,
  }));

export default login;
