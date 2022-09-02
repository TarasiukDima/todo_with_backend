import React, { FC } from "react";
import { Container } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import css from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={css.footer}>
      <Container className={css.footer__wrapper}>
        <CopyrightIcon color="inherit" />, 2022 Tarasiuk Dima
      </Container>
    </footer>
  );
};

export default Footer;
