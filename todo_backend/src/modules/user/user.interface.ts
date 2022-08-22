import { Todo } from '../todo/entities/todo.entity';

export interface ILoginUserData {
  login: string;
  password: string;
}

export interface IUser extends ILoginUserData {
  id: string;
  username: string;
  createdAt: number;
  todos: Array<Todo>;
}

export interface IJWTToken {
  id: string;
  login: string;
  isRefresh?: boolean;
}

export interface ITokenAnswer {
  accessToken: string;
  refreshToken: string;
}

export interface IJWTData extends IJWTToken {
  iat: number;
  exp: number;
}
