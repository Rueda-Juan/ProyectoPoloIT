import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { RentalPhoto } from './rental-photo.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.rentals, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column('int')
  rooms: number;

  @Column({ default: false })
  accessibility: boolean;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  area: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  availableFrom: Date;

  @CreateDateColumn()
  createdAt: Date;

  // Relaciones
  @OneToMany(() => RentalPhoto, (photo) => photo.rental, { cascade: true })
  photos: RentalPhoto[];

  @OneToMany(() => Favorite, (favorite) => favorite.rental)
  favorites: Favorite[];
}
