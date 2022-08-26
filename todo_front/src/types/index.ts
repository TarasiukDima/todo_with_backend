import { ReactNode } from "react";

export type TSimpleFunction = () => void;

export interface ITodo {
  id: string;
  title: string;
  text: string;
  done: boolean;
}

export interface IChildren {
  children: ReactNode | Array<ReactNode>;
}

export interface IUserLogIn {
  login: string;
  password: string;
}

export interface IUserRegistration extends IUserLogIn {
  name?: string;
}
