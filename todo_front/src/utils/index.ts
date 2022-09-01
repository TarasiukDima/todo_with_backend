import jwtDecode from "jwt-decode";
import {
  BACKEND_URL,
  CURRENT_PAGE_LOCALSTORAGE,
  REFRESH_TOKEN_AUTH_LOCALSTORAGE,
  TOKEN_AUTH_LOCALSTORAGE,
} from "../settings";
import { ITokenAnswer } from "../types";

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

export const savePage = (page: number): void => {
  localStorage.setItem(CURRENT_PAGE_LOCALSTORAGE, page.toString());
};

export const checkPage = (page: number, maxPage: number): number => {
  if (page > maxPage) {
    return maxPage;
  } else if (page < 1) {
    return 1;
  } else {
    return page;
  }
};

export const isExpDateToken = (token: string | null): boolean => {
  if (!token) return true;

  const { exp } = jwtDecode(token) as { exp: number };

  return exp * 1000 < Date.now();
};

export const refreshTokenFn = async (
  refreshToken: string | null
): Promise<ITokenAnswer> => {
  const tokens = await fetch(`${BACKEND_URL}/user/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
    .then((data) => data.json())
    .catch((_) => false);

  return tokens;
};
