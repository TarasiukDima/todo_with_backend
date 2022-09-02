import { ReactNode } from "react";

export type TSimpleFunction = () => void;

export interface ITokenAnswer {
  accessToken: string;
  refreshToken: string;
}

export interface IErrorAnswer {
  error: string;
  message: string;
  statusCode: number;
}

export interface ICreateTodo {
  title: string;
  text: string;
}

export interface IUpdateTodo {
  title?: string;
  text?: string;
  done?: boolean;
}

export interface ITodo extends ICreateTodo {
  id: string;
  done: boolean;
}

export interface ITodoData {
  items: Array<ITodo>;
  count: number;
}

export interface IChildren {
  children: ReactNode | Array<ReactNode>;
}

export interface IUserLogIn {
  login: string;
  password: string;
}

export interface IUserRegistration extends IUserLogIn {
  username?: string;
}
