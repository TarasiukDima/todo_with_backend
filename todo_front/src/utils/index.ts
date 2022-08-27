import {
  REFRESH_TOKEN_AUTH_LOCALSTORAGE,
  TOKEN_AUTH_LOCALSTORAGE,
} from "../settings";

export const setLocalStorageTokens = (
  token: string,
  refreshToken: string
): void => {
  localStorage.setItem(TOKEN_AUTH_LOCALSTORAGE, token);
  localStorage.setItem(REFRESH_TOKEN_AUTH_LOCALSTORAGE, refreshToken);
};

export const clearLocalStorageTokens = (): void => {
  localStorage.removeItem(TOKEN_AUTH_LOCALSTORAGE);
  localStorage.removeItem(REFRESH_TOKEN_AUTH_LOCALSTORAGE);
};
