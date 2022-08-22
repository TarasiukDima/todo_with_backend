import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './settings';

const commonOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  migrationsRun: false,
  synchronize: true,
  logging: true,
};

export const typeormConfig = {
  ...commonOptions,
  entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
  migrations: [__dirname + './migration/*.{ts,js}'],
  retryAttempts: 10,
} as TypeOrmModuleOptions;

export const dataSourceConfig = {
  ...commonOptions,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['src/migration/*.{ts,js}'],
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceConfig);
