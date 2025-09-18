import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { Rental } from '../modules/rentals/rental.entity';
import { Favorite } from '../modules/favorites/favorite.entity';
import { RentalPhoto } from '../modules/rentals/rental-photo.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Rental, Favorite, RentalPhoto],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  ssl: {
    rejectUnauthorized: false,
  },
});
