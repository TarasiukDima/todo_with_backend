import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';
import { getTokenAndUserId } from './helpers';
import request from './helpers/commonRequest';
import {
  badRandomMockUUID,
  createTodoDto,
  updateTodoDto,
  randomMockUUID,
  todosRoutes,
  usersRoutes,
} from './helpers/settings';

describe('Todos (e2e)', () => {
  const commonHeaders = { Accept: 'application/json' };

  describe('Without Auth', () => {
    it('Add todo', async () => {
      const addTodoRespond = await request
        .post(todosRoutes.create)
        .set(commonHeaders)
        .send(createTodoDto);

      expect(addTodoRespond.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('Get todos', async () => {
      const getTodosRespond = await request
        .get(todosRoutes.getAll)
        .set(commonHeaders);

      expect(getTodosRespond.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('Update todo', async () => {
      const updateTodoRespond = await request
        .patch(todosRoutes.update(randomMockUUID))
        .set(commonHeaders)
        .send(updateTodoDto);

      expect(updateTodoRespond.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('Delete todo', async () => {
      const deleteTodoRespond = await request
        .delete(todosRoutes.delete(randomMockUUID))
        .set(commonHeaders);

      expect(deleteTodoRespond.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('With Auth', () => {
    let mockUserId: string | undefined;
    let mockTodoId: string | undefined;

    beforeAll(async () => {
      const { token, mockUserId: userId } = await getTokenAndUserId(request);
      mockUserId = userId;
      commonHeaders['Authorization'] = token;
    });

    afterAll(async () => {
      if (mockUserId) {
        await request.delete(usersRoutes.delete(mockUserId)).set(commonHeaders);
      }

      if (commonHeaders['Authorization']) {
        commonHeaders['Authorization'] = '';
      }
    });

    describe('Add todo', () => {
      it('should correctly add todo', async () => {
        const addTodoRespond = await request
          .post(todosRoutes.create)
          .set(commonHeaders)
          .send(createTodoDto);

        const { id, title, text, done, updatedAt, createdAt } =
          addTodoRespond.body;

        mockTodoId = id;

        expect(addTodoRespond.status).toBe(StatusCodes.CREATED);
        expect(validate(id)).toBe(true);
        expect(title).toBe(createTodoDto.title);
        expect(text).toBe(createTodoDto.text);
        expect(done).toBeFalsy();
        expect(typeof updatedAt).toBe('string');
        expect(typeof createdAt).toBe('string');
      });

      it('should respond with BAD_REQUEST in case of invalid data', async () => {
        const addTodoRespond1 = await request
          .post(todosRoutes.create)
          .set(commonHeaders)
          .send({
            ...createTodoDto,
            notNeed: 'Test',
          });

        expect(addTodoRespond1.statusCode).toBe(StatusCodes.BAD_REQUEST);

        const addTodoRespond2 = await request
          .post(todosRoutes.create)
          .set(commonHeaders)
          .send({});

        expect(addTodoRespond2.statusCode).toBe(StatusCodes.BAD_REQUEST);

        const addTodoRespond3 = await request
          .post(todosRoutes.create)
          .set(commonHeaders)
          .send({ text: '', title: '' });

        expect(addTodoRespond3.statusCode).toBe(StatusCodes.BAD_REQUEST);
      });
    });

    it('Get todos', async () => {
      const getTodosRespond = await request
        .get(todosRoutes.getAll)
        .set(commonHeaders);

      expect(getTodosRespond.status).toBe(StatusCodes.OK);
      expect(getTodosRespond.body.items).toHaveLength(1);

      const { title, text, done } = getTodosRespond.body.items[0];

      expect(title).toBe(createTodoDto.title);
      expect(text).toBe(createTodoDto.text);
      expect(done).toBeFalsy();

      // add new todo
      await request
        .post(todosRoutes.create)
        .set(commonHeaders)
        .send(createTodoDto);

      // check count todos
      const getNewTodosRespond = await request
        .get(todosRoutes.getAll)
        .set(commonHeaders);

      expect(getNewTodosRespond.status).toBe(StatusCodes.OK);
      expect(getNewTodosRespond.body.items).toHaveLength(2);
    });

    describe('Update todo', () => {
      it('should correctly update todo', async () => {
        const updateTodoRespond = await request
          .patch(todosRoutes.update(mockTodoId))
          .set(commonHeaders)
          .send(updateTodoDto);

        const { title, text, done } = updateTodoRespond.body;

        expect(updateTodoRespond.status).toBe(StatusCodes.OK);
        expect(title).toBe(updateTodoDto.title);
        expect(text).toBe(updateTodoDto.text);
        expect(done).toBe(updateTodoDto.done);
      });

      it('should respond with NOT_FOUND in case of invalid todo id', async () => {
        const updateTodoRespond = await request
          .patch(todosRoutes.update(randomMockUUID))
          .set(commonHeaders)
          .send(updateTodoDto);

        expect(updateTodoRespond.status).toBe(StatusCodes.NOT_FOUND);
      });
    });

    describe('Delete todo', () => {
      it('should correctly delete todo', async () => {
        const deleteTodoRespond = await request
          .delete(todosRoutes.delete(mockTodoId))
          .set(commonHeaders);

        expect(deleteTodoRespond.status).toBe(StatusCodes.NO_CONTENT);
      });

      it('should respond with BAD_REQUEST in case of invalid data', async () => {
        const deleteTodoRespond = await request
          .delete(todosRoutes.delete(badRandomMockUUID))
          .set(commonHeaders);

        expect(deleteTodoRespond.status).toBe(StatusCodes.BAD_REQUEST);
      });
    });
  });
});
