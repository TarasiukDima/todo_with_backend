import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import PageContent from "../../components/PageContent";
import { RoutesSettings } from "../../settings";
import css from "./ErrorPage.module.scss";

interface ILocationState {
  errorText: string;
}

const ErrorPage: FC = () => {
  const { state } = useLocation();
  const { errorText } = state as ILocationState;

  return (
    <PageContent>
      <Typography
        component="h2"
        fontWeight={600}
        variant="h1"
        align="center"
        mb={5}
      >
        Something went wrong!
      </Typography>

      <Typography
        className={css.home__description}
        component="p"
        variant="inherit"
        align="center"
        mb={5}
      >
        {errorText}
      </Typography>

      <Button href={RoutesSettings.home} className={css.home__link}>
        Home page
      </Button>
    </PageContent>
  );
};

export default ErrorPage;
