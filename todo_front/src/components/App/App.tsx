import React, { FC } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import ThemeToDoProvider from "../ThemeToDoProvider";
import ErrorBoundary from "../ErrorBoundary";
import AppRoutes from "../AppRoutes";
import { store } from "../../store/store";
import "./App.scss";

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeToDoProvider>
        <HashRouter>
          <ErrorBoundary>
            <SnackbarProvider maxSnack={3}>
              <AppRoutes />
            </SnackbarProvider>
          </ErrorBoundary>
        </HashRouter>
      </ThemeToDoProvider>
    </Provider>
  );
};

export default App;
