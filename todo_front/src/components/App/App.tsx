import React, { FC } from "react";
import { HashRouter } from "react-router-dom";
import ThemeToDoProvider from "../ThemeToDoProvider";
import ErrorBoundary from "../ErrorBoundary";
import AppRoutes from "../AppRoutes";
import "./App.scss";

const App: FC = () => {
  return (
    <ThemeToDoProvider>
      <HashRouter>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </HashRouter>
    </ThemeToDoProvider>
  );
};

export default App;
