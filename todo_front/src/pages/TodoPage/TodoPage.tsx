import React from "react";
import { Typography } from "@mui/material";
import PageContent from "../../components/PageContent";
import css from "./TodoPage.module.scss";

const TodoPage = () => {
  return (
    <PageContent>
      <Typography
        className={css.authPage__title}
        variant="h1"
        component="h2"
        align="center"
        fontWeight={400}
        mb={5}
      >
        Todo page
      </Typography>


    </PageContent>
  );
};

export default TodoPage;
