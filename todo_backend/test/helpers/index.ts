import { createUserDto, loginUserDto, usersRoutes } from './settings';

type ITokensAnswer = {
  accessToken: string;
  refreshToken: string;
};

type IUserData = {
  login: string;
  password: string;
};

const signUp = async (request): Promise<string> => {
  const responseSignUp = await request
    .post(usersRoutes.signup)
    .set('Accept', 'application/json')
    .send(createUserDto);

  return responseSignUp.body.id || '';
};

const signIn = async (request, data: IUserData): Promise<ITokensAnswer> => {
  const responseSignIn = await request
    .post(usersRoutes.signin)
    .set('Accept', 'application/json')
    .send(data);

  return {
    accessToken: responseSignIn.body.accessToken || '',
    refreshToken: responseSignIn.body.refreshToken || '',
  };
};

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const getTokenAndUserId = async (request) => {
  let userId, responseSignIn;

  try {
    userId = await signUp(request);
    responseSignIn = await signIn(request, loginUserDto);
  } catch (_) {
    responseSignIn = await signIn(request, loginUserDto);

    const jwtData = parseJwt(responseSignIn.accessToken);
    userId = jwtData.id;
  }

  return {
    mockUserId: userId,
    token: `Bearer ${responseSignIn.accessToken}`,
  };
};

export const removeTokenUser = async (request, userId, commonHeaders) => {
  await request.delete(usersRoutes.delete(userId)).set(commonHeaders);
};
