import 'dotenv/config';
import { RelationOptions } from 'typeorm';

export const PORT = Number(process.env.PORT) || 3000;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

export const CRYPT_SALT = Number(process.env.CRYPT_SALT);
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME;
export const TOKEN_REFRESH_EXPIRE_TIME = process.env.TOKEN_REFRESH_EXPIRE_TIME;

export const VERSION_UUID = '4';

export const USER_ENTITY_OPTIONS = {
  onDelete: 'CASCADE',
  eager: false,
} as RelationOptions;

export const TODO_ENTITY_OPTIONS = {
  onDelete: 'CASCADE',
  cascade: true,
  eager: false,
} as RelationOptions;

export const MIN_LENGTH_LOGIN = 3;
export const MAX_LENGTH_LOGIN = 15;
export const MIN_LENGTH_PASSWORD = 5;
export const MAX_LENGTH_PASSWORD = 15;

export const IS_PUBLIC_KEY = 'isPublic';

export const fieldRegExp = new RegExp('\\/|\\<|\\>', 'g');
