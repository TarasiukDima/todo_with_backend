export const UNCAUGHT_ERROR = 'Uncaught error';
export const UNHANDLED_ERROR = 'Unhandled error';

export enum TODO_MESSAGES {
  notFoundTodo = 'Todo not found!',
  removedTodo = 'Todo removed successfully!',
}

export enum AUTH_MESSAGES {
  userExist = 'User with this login exist!',
  notFoundUser = 'User not exist!',
  badLoginData = 'No user with such login, password',
  notFoundUserToken = 'No user with such login or id from token',
  invalidRefreshToken = 'Refresh token is invalid or expired',
  notAuthorization = 'User not authorization',
}
