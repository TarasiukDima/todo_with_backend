import {
  MAX_LENGTH_LOGIN,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_TODO_TEXT,
  MAX_LENGTH_TODO_TITLE,
  MAX_LENGTH_USERNAME,
  MIN_LENGTH_LOGIN,
  MIN_LENGTH_PASSWORD,
  MIN_LENGTH_TODO_TEXT,
  MIN_LENGTH_TODO_TITLE,
  MIN_LENGTH_USERNAME,
} from "./settings";

export const FormTodoMessages = {
  placeHolderTitle: "Title",
  titleError: "Need to fill in todo title",
  minTitleError: `Min length todo title ${MIN_LENGTH_TODO_TITLE}`,
  maxTitleError: `Max length todo title ${MAX_LENGTH_TODO_TITLE}`,
  placeHolderText: "Description",
  textError: "Need to fill in todo description",
  minTextError: `Min length todo description ${MIN_LENGTH_TODO_TEXT}`,
  maxTextError: `Max length todo description ${MAX_LENGTH_TODO_TEXT}`,
};

export const RegistrationMessages = {
  title: "Registration form",
  nameUserError: "Need to fill in your name",
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
  loginError: "Need to fill in your login",
  minLoginError: `Min length login ${MIN_LENGTH_LOGIN}`,
  maxLoginError: `Max length login ${MAX_LENGTH_LOGIN}`,
  passwordError: "Need to fill in your password",
  minPasswordError: `Min length login ${MIN_LENGTH_PASSWORD}`,
  maxPasswordError: `Max length login ${MAX_LENGTH_PASSWORD}`,
};
