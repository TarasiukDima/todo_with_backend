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
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {

      const { statusCode } = action.payload.data;
      if (statusCode === 401) {

        clearLocalStorageTokens();
        api.dispatch(setToken(null));
        api.dispatch(setRefreshToken(null));

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
