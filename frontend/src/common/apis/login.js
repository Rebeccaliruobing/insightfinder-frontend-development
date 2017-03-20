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
  );

export default login;
