import { FC } from "react";
import { Navigate } from "react-router-dom";
import { RoutesSettings } from "../../settings";
import { useTodoSelector } from "../../store/store";

interface IRequiredAuthProps {
  children: JSX.Element | null;
  redirect?: string;
}

const RequiredAuth: FC<IRequiredAuthProps> = ({
  children,
  redirect = RoutesSettings.home,
}: IRequiredAuthProps) => {
  const { token } = useTodoSelector((state) => state.app);

  if (!token) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default RequiredAuth;
