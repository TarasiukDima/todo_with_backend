import React, { FC, ReactNode } from "react";
import { Container } from "@mui/system";
import { IChildren } from "../../types";
import css from "./Main.module.scss";

interface IMainProps extends IChildren {
  sectionClass?: string;
}

const Main: FC<IMainProps> = ({ sectionClass = "", children }) => {
  return (
    <main className={css.main}>
      <section className={sectionClass}>
        <Container>{children}</Container>
      </section>
    </main>
  );
};

export default Main;
