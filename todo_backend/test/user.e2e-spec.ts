import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';
import request from './helpers/commonRequest';
import {
  badRandomMockUUID,
  createUserDto,
  loginUserDto,
  randomMockUUID,
  usersRoutes,
} from './helpers/settings';

describe('Users (e2e)', () => {
  const commonHeaders = { Accept: 'application/json' };
  let mockUserId: string | undefined;
  let accessToken: string | undefined;
  let refreshToken: string | undefined;

  describe('Public routes', () => {
    describe('signup', () => {
      it('should correctly create user', async () => {
        const signUpRespond = await request
          .post(usersRoutes.signup)
          .set(commonHeaders)
          .send(createUserDto);

        const { id, username, login, createdAt } = signUpRespond.body;

        mockUserId = id;

        expect(signUpRespond.status).toBe(StatusCodes.CREATED);
        expect(signUpRespond.body).not.toHaveProperty('password');
        expect(validate(id)).toBe(true);
        expect(username).toBe(createUserDto.username);
        expect(login).toBe(createUserDto.login);
        expect(typeof createdAt).toBe('string');
      });

      it('should respond with BAD_REQUEST in case of invalid data', async () => {
        const responds = await Promise.all([
          request.post(usersRoutes.signup).set(commonHeaders).send({}),
          request
            .post(usersRoutes.signup)
            .set(commonHeaders)
            .send({ login: createUserDto.login }),
          request
            .post(usersRoutes.signup)
            .set(commonHeaders)
            .send({ password: createUserDto.password }),
          request
            .post(usersRoutes.signup)
            .set(commonHeaders)
            .send({ login: '', password: '' }),
        ]);

        expect(
          responds.every(
            ({ statusCode }) => statusCode === StatusCodes.BAD_REQUEST,
          ),
        );
      });
    });

    describe('signin', () => {
      it('should correctly signin', async () => {
        const signInRespond = await request
          .post(usersRoutes.signin)
          .set(commonHeaders)
          .send(loginUserDto);

        expect(signInRespond.statusCode).toBe(StatusCodes.OK);
        expect(signInRespond.body).toHaveProperty('accessToken');
        expect(signInRespond.body).toHaveProperty('refreshToken');

        const { accessToken: userAccessToken, refreshToken: userRefreshToken } =
          signInRespond.body;

        accessToken = userAccessToken;
        refreshToken = userRefreshToken;

        expect(userAccessToken).not.toHaveLength(0);
        expect(userRefreshToken).not.toHaveLength(0);
        expect(typeof userAccessToken).toBe('string');
        expect(typeof userRefreshToken).toBe('string');
      });

      it('should respond with BAD_REQUEST in case of invalid data', async () => {
        // have unnecessary field username
        const signInRespond1 = await request
          .post(usersRoutes.signin)
          .set(commonHeaders)
          .send(createUserDto);

        expect(signInRespond1.statusCode).toBe(StatusCodes.BAD_REQUEST);

        // short or empty data
        const signInRespond2 = await request
          .post(usersRoutes.signin)
          .set(commonHeaders)
          .send({ login: '', password: '' });

        expect(signInRespond2.statusCode).toBe(StatusCodes.BAD_REQUEST);
      });
    });
  });

  describe('Need auth routes', () => {
    describe('without auth should respond with Unauthorized Exception', () => {
      beforeAll(async () => {
        commonHeaders['Authorization'] = '';
      });

      it('Get user', async () => {
        const getUserRespond = await request
          .get(usersRoutes.getById(mockUserId))
          .set(commonHeaders);

        expect(getUserRespond.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      });

      it('Delete user', async () => {
        const deleteUserRespond = await request
          .delete(usersRoutes.delete(mockUserId))
          .set(commonHeaders);

        expect(deleteUserRespond.statusCode).toBe(StatusCodes.UNAUTHORIZED);
      });
    });

    describe('with auth', () => {
      beforeAll(async () => {
        commonHeaders['Authorization'] = `Bearer ${accessToken}`;
      });

      afterAll(async () => {
        if (mockUserId) {
          await request
            .delete(usersRoutes.delete(mockUserId))
            .set(commonHeaders);
        }

        if (commonHeaders['Authorization']) {
          commonHeaders['Authorization'] = '';
        }
      });

      describe('Get refresh token', () => {
        it('should correctly get new pair of tokens if refresh token in headers', async () => {
          const refreshTokenRespond = await request
            .get(usersRoutes.refresh)
            .set({
              ...commonHeaders,
              Authorization: `Bearer ${refreshToken}`,
            });

          expect(refreshTokenRespond.statusCode).toBe(StatusCodes.OK);

          const {
            accessToken: userAccessToken,
            refreshToken: userRefreshToken,
          } = refreshTokenRespond.body;

          expect(userAccessToken).not.toHaveLength(0);
          expect(userRefreshToken).not.toHaveLength(0);
          expect(typeof userAccessToken).toBe('string');
          expect(typeof userRefreshToken).toBe('string');
        });

        it('should respond with BAD_REQUEST in case of not authorization user', async () => {
          commonHeaders['Authorization'] = '';
          const refreshTokenRespond1 = await request
            .get(usersRoutes.refresh)
            .set({
              ...commonHeaders,
              Authorization: '',
            });

          expect(refreshTokenRespond1.statusCode).toBe(
            StatusCodes.UNAUTHORIZED,
          );

          // token instead of refresh token in head
          commonHeaders['Authorization'] = `Bearer ${accessToken}`;
          const refreshTokenRespond2 = await request
            .get(usersRoutes.refresh)
            .set(commonHeaders);

          expect(refreshTokenRespond2.statusCode).toBe(StatusCodes.BAD_REQUEST);
        });
      });

      describe('Get one user', () => {
        it('should correctly get user by id', async () => {
          const getOneUserRespond = await request
            .get(usersRoutes.getById(mockUserId))
            .set(commonHeaders);

          const { id, username, login } = getOneUserRespond.body;

          expect(getOneUserRespond.status).toBe(StatusCodes.OK);
          expect(getOneUserRespond.body).not.toHaveProperty('password');
          expect(validate(id)).toBe(true);
          expect(username).toBe(createUserDto.username);
          expect(login).toBe(createUserDto.login);
        });

        it('should respond with BAD_REQUEST status code in case of invalid  user id', async () => {
          const getOneUserRespond = await request
            .get(usersRoutes.getById(badRandomMockUUID))
            .set(commonHeaders);

          expect(getOneUserRespond.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
          const getOneUserRespond = await request
            .get(usersRoutes.getById(randomMockUUID))
            .set(commonHeaders);

          expect(getOneUserRespond.status).toBe(StatusCodes.NOT_FOUND);
        });
      });

      describe('DELETE user', () => {
        it('should respond with BAD_REQUEST status code in case of invalid id', async () => {
          const respond = await request
            .delete(usersRoutes.delete(badRandomMockUUID))
            .set(commonHeaders);

          expect(respond.status).toBe(StatusCodes.BAD_REQUEST);
        });

        it("should respond with NOT_FOUND status code in case if user doesn't exist", async () => {
          const respond = await request
            .delete(usersRoutes.delete(randomMockUUID))
            .set(commonHeaders);

          expect(respond.status).toBe(StatusCodes.NOT_FOUND);
        });

        it('should correctly delete user', async () => {
          const deleteRespond = await request
            .delete(usersRoutes.delete(mockUserId))
            .set(commonHeaders);

          expect(deleteRespond.status).toBe(StatusCodes.NO_CONTENT);
          mockUserId = '';
        });
      });
    });
  });
});
