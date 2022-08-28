import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import TodoPage from "../../pages/TodoPage";
import NoDoubleLogin from "../NoDoubleLogin";
import AppSuspensePage from "./AppSuspensePage";
import { RoutesSettings } from "../../settings";
import { VariantAuthPage } from "../../pages/Authorization/Authorization";
import RequiredAuth from "../RequiredAuth";

const Authorization = React.lazy(() => import("../../pages/Authorization"));
const NotFound = React.lazy(() => import("../../pages/NotFound"));
const ErrorPage = React.lazy(() => import("../../pages/ErrorPage"));

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={RoutesSettings.home} element={<Home />} />
      <Route
        path={RoutesSettings.todo}
        element={
          <RequiredAuth>
            <TodoPage />
          </RequiredAuth>
        }
      />
      <Route
        path={RoutesSettings.signin}
        element={
          <NoDoubleLogin redirect={RoutesSettings.home}>
            <AppSuspensePage>
              <Authorization
                key={VariantAuthPage.LogIn}
                variantPage={VariantAuthPage.LogIn}
              />
            </AppSuspensePage>
          </NoDoubleLogin>
        }
      />
      <Route
        path={RoutesSettings.signup}
        element={
          <NoDoubleLogin redirect={RoutesSettings.home}>
            <AppSuspensePage>
              <Authorization
                key={VariantAuthPage.Registration}
                variantPage={VariantAuthPage.Registration}
              />
            </AppSuspensePage>
          </NoDoubleLogin>
        }
      />
      <Route
        path={RoutesSettings.error}
        element={
          <AppSuspensePage>
            <ErrorPage />
          </AppSuspensePage>
        }
      />
      <Route
        path={RoutesSettings.notFoundPage}
        element={
          <AppSuspensePage>
            <NotFound />
          </AppSuspensePage>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
