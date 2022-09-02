import React, { FC, Ref } from "react";
import { IChildren } from "../../types";
import Footer from "../Footer";
import Header from "../Header";
import Main from "../Main";

interface IPageContentProps extends IChildren {
  sectionClass?: string;
}

const PageContent: FC<IPageContentProps> = ({
  children,
  sectionClass = "",
}) => {
  return (
    <>
      <Header />
      <Main sectionClass={sectionClass}>{children}</Main>
      <Footer />
    </>
  );
};

export default PageContent;
