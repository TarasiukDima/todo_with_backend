import React, { FC } from "react";
import Spinner from "../Spinner";
import { IChildren } from "../../types";

const AppSuspensePage: FC<IChildren> = ({ children }) => {
  return <React.Suspense fallback={<Spinner size={150} mt={3} />}>{children}</React.Suspense>;
};

export default AppSuspensePage;
