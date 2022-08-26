import React from "react";
import { Button, Typography } from "@mui/material";
import PageContent from "../../components/PageContent";
import css from "./Home.module.scss";
import { RoutesSettings } from "../../settings";

const Home = () => {
  return (
    <PageContent sectionClass={css.home}>
      <Typography
        component="h2"
        fontWeight={400}
        variant="h1"
        align="center"
        mb={5}
      >
        Home page
      </Typography>

      <Typography
        className={css.home__description}
        component="p"
        variant="inherit"
        align="center"
        mb={5}
      >
        Simple ToDo app with backend
      </Typography>

      <Button href={RoutesSettings.signup} className={css.home__link}>
        Registration page
      </Button>
    </PageContent>
  );
};

export default Home;
