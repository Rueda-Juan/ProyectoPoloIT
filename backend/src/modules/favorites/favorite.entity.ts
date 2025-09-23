import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Rental } from '../rentals/rental.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Rental, (rental) => rental.favorites, {
    onDelete: 'CASCADE',
  })
  rental!: Rental;
}
