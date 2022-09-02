import { IUser } from '../user/user.interface';

export interface ITodo {
  id: string;
  title: string;
  text: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
  user: IUser;
}

export interface IPaginationParams {
  offset: number;
  limit: number;
}
