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
export const MIN_LENGTH_PASSWORD = 3;
export const MAX_LENGTH_PASSWORD = 15;
/* user settings end */
