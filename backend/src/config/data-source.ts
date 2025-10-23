import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],

  
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  ssl: {
    rejectUnauthorized: false,
  },
};

export const AppDataSource = new DataSource(AppDataSourceOptions);