/* user settings start */
export const usersRoutes = {
  signup: '/user/signup',
  signin: '/user/signin',
  refresh: '/user/refresh',
  getById: (userId: string) => `/user/${userId}`,
  delete: (userId: string) => `/user/${userId}`,
};

const RANDOM_NUMBER_FOR_USER = Math.round(Math.random() * 100000);

export const loginUserDto = {
  login: 'TEST' + RANDOM_NUMBER_FOR_USER,
  password: 'TEST_TEST',
};

export const createUserDto = {
  ...loginUserDto,
  username: 'TEST',
};

export const badRandomMockUUID = '49a0-46e8-a3db-d320ff3bb072';
export const randomMockUUID = 'cd994a53-49a0-46e8-a3db-d320ff3bb072';
/* user settings end */

/* todos settings start */
export const todosRoutes = {
  getAll: '/todo',
  create: '/todo',
  update: (todoId: string) => `/todo/${todoId}`,
  delete: (todoId: string) => `/todo/${todoId}`,
};

export const createTodoDto = {
  title: 'TEST',
  text: 'TEST',
};

export const updateTodoDto = {
  title: 'UPDATE_TEST',
  text: 'UPDATE_TEST',
  done: true,
};
/* todos settings end */
