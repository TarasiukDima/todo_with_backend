import { FC, useEffect } from "react";
import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { setRefreshToken, setToken } from "../appSlice";
import { RoutesSettings } from "../../settings";
import { clearLocalStorageTokens } from "../../utils";

export const unauthUserHandler: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  async (action) => {
    if (isRejectedWithValue(action)) {
      const { statusCode } = action.payload.data;

      if (statusCode === 401) {
        clearLocalStorageTokens();
        dispatch(setToken(null));
        dispatch(setRefreshToken(null));

        return <NavigateToHomePage />;
      }
    }

    return next(action);
  };

const NavigateToHomePage: FC = () => {
  useEffect(() => {
    <Navigate to={RoutesSettings.home} />;
  }, []);
  return null;
};
