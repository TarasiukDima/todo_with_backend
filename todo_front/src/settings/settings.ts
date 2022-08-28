import { OptionsObject } from "notistack";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const TOKEN_AUTH_LOCALSTORAGE = "USER_TOKEN";
export const REFRESH_TOKEN_AUTH_LOCALSTORAGE = "USER_REFRESH_TOKEN";
export const CURRENT_PAGE_LOCALSTORAGE = "CURRENT_PAGE";
export const COUNT_TODOS_PAGE = 10;

export const RoutesSettings = {
  home: "/",
  todo: "/todo",
  signin: "/signin",
  signup: "/signup",
  error: "/error",
  notFoundPage: "*",
};

/* todo settings start */
export const fieldRegExp = new RegExp("\\/|\\<|\\>", "g");
export const MIN_LENGTH_TODO_TITLE = 3;
export const MAX_LENGTH_TODO_TITLE = 100;
export const MIN_LENGTH_TODO_TEXT = 10;
export const MAX_LENGTH_TODO_TEXT = 400;
/* todo settings end */

/* user settings start */
export const MIN_LENGTH_USERNAME = 3;
export const MAX_LENGTH_USERNAME = 15;
export const MIN_LENGTH_LOGIN = 3;
export const MAX_LENGTH_LOGIN = 15;
export const MIN_LENGTH_PASSWORD = 5;
export const MAX_LENGTH_PASSWORD = 15;
/* user settings end */

// options show SNACKBAR
const commonMessageOptions: OptionsObject = {
  autoHideDuration: 1000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
};
export const messageErrorOptions: OptionsObject = {
  ...commonMessageOptions,
  variant: "error",
};

export const messageSuccessOptions: OptionsObject = {
  ...commonMessageOptions,
  variant: "success",
};
