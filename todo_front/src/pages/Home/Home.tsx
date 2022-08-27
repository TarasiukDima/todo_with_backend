import React, { FC } from "react";
import { useTodoSelector } from "../../store/store";
import { Button, Typography } from "@mui/material";
import PageContent from "../../components/PageContent";
import { RoutesSettings } from "../../settings";
import css from "./Home.module.scss";

const Home: FC = () => {
  const { token } = useTodoSelector((state) => state.app);

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

      {!token && (
        <Button href={RoutesSettings.signup} className={css.home__link}>
          Registration page
        </Button>
      )}
    </PageContent>
  );
};

export default Home;
