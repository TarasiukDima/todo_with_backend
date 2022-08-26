import {
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_USERNAME,
} from "./settings";

export enum FormTodoMessages {}

export const RegistrationMessages = {
  title: "Registration form",
  nameUserError: "Need type you name",
  placeHolder: "Username",
  minUserError: `Min length username ${MIN_LENGTH_USERNAME}`,
  maxUserError: `Max length username ${MAX_LENGTH_USERNAME}`,
  changePage: "if you have login. Change page to",
  anotherFormPageName: "Authorization page",
};

export const AuthorizationMessages = {
  title: "Authorization form",
  changePage: "if you haven't login. Change page to",
  anotherFormPageName: "Registration page",
};

export const UserFormMessages = {
  placeHolderLogin: "Login",
  placeHolderPassword: "Password",
  loginError: "Need type you login",
  minLoginError: `Min length login ${MIN_LENGTH_LOGIN}`,
  maxLoginError: `Max length login ${MAX_LENGTH_LOGIN}`,
  passwordError: "Need type you password",
  minPasswordError: `Min length login ${MIN_LENGTH_PASSWORD}`,
  maxPasswordError: `Max length login ${MAX_LENGTH_PASSWORD}`,
};
