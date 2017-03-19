/* @flow */
import { defineMessages } from 'react-intl';

const authMessages = defineMessages({
  hintsOr: {
    defaultMessage: 'or',
    id: 'auth.hint.or',
  },
  hintsUserName: {
    defaultMessage: 'username?',
    id: 'auth.hint.userName',
  },
  hintsNewUser: {
    defaultMessage: 'New user?',
    id: 'auth.hint.newuser',
  },
  hintsForgotPassword: {
    defaultMessage: 'Forgot password?',
    id: 'auth.hint.forgotPassword',
  },
  buttonsSignIn: {
    defaultMessage: 'Sign In',
    id: 'auth.buttons.signin',
  },
  buttonsSignUp: {
    defaultMessage: 'Sign Up',
    id: 'auth.buttons.signup',
  },
  errorsUserNameRequired: {
    defaultMessage: 'User name is required',
    id: 'auth.errors.userNameRequired',
  },
  errorsPasswordRequired: {
    defaultMessage: 'Password is required',
    id: 'auth.errors.passwordRequired',
  },
});

export default authMessages;
