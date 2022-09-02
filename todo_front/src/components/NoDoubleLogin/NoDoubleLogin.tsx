import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RoutesSettings } from "../../settings";
import { useTodoSelector } from "../../store/store";

interface INoDoubleLoginProps {
  children: JSX.Element | null;
  redirect?: string;
}

const NoDoubleLogin: FC<INoDoubleLoginProps> = ({
  children,
  redirect = RoutesSettings.home,
}: INoDoubleLoginProps) => {
  const { token } = useTodoSelector((state) => state.app);

  if (token) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default NoDoubleLogin;
