import { getSchemaPath } from '@nestjs/swagger';
import { Todo } from '../modules/todo/entities/todo.entity';

export enum DOC_MESSAGES {
  todoCreated = 'The todo has been successfully created.',
  todoDeleted = 'The todo has been successfully deleted.',
  getTodo = 'The todos has been successfully got.',
  update = 'The todos has been successfully updated.',
  todoBad = 'The todo id is bad.',
  todoNotFound = 'The todo has not been founded.',
  unauthorized = 'User not authorization.',
  userCreated = 'The user has been successfully created.',
  userSignIn = 'The user has been successfully authorization.',
  userRefresh = 'The user tokens has been successfully got.',
  userBad = 'The user id, or data are bad.',
  userGet = 'The user info has been successfully got.',
  userDeleted = 'The user has been successfully deleted.',
  userNotFound = 'The user has not been founded.',
}

const getSchemaErrors = (status: number, message: string, error: string) => {
  return {
    type: 'object',
    properties: {
      statusCode: {
        type: 'number',
        example: status,
      },
      message: {
        type: 'string',
        example: message,
      },
      error: {
        type: 'string',
        example: error,
      },
    },
  };
};

export const unauthorizedResponse = getSchemaErrors(
  401,
  'User not authorization',
  'Unauthorized',
);
export const notFoundResponse = getSchemaErrors(404, 'Not exist!', 'Not Found');

export const badResponse = getSchemaErrors(400, 'Message', 'Bad Request');

export const tokensSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
    refreshToken: {
      type: 'string',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  },
};

export const todoSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: { $ref: getSchemaPath(Todo) },
    },
    count: {
      type: 'number',
      example: 1,
    },
  },
};
