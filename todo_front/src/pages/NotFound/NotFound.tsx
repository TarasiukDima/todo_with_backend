import React from "react";
import { Button, Typography } from "@mui/material";
import PageContent from "../../components/PageContent";
import { RoutesSettings } from "../../settings";
import css from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <PageContent>
      <Typography
        component="h2"
        variant="h1"
        align="center"
        fontWeight={600}
        mb={5}
      >
        404
      </Typography>

      <Typography component="p" variant="inherit" align="center" mb={2}>
        Page not found!
      </Typography>

      <Button href={RoutesSettings.home} className={css.home__link}>
        Home page
      </Button>
    </PageContent>
  );
};

export default NotFound;
