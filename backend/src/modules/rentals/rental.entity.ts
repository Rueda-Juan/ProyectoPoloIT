import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';
import { RentalPhoto } from './rental-photo.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.rentals, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ length: 150 })
  title!: string;

  @Column({ length: 200 })
  address!: string;

  @Column('int')
  rooms!: number;

  @Column({ default: false })
  accessibility!: boolean;

  @Index()
  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  area!: number;

  @Column('text', { nullable: true, default: '' })
  description!: string;

  @Column({ name: 'available_from', type: 'date', nullable: true })
  availableFrom!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  // Relaciones
  @OneToMany(() => RentalPhoto, (photo) => photo.rental, { cascade: true })
  photos!: RentalPhoto[];

  @OneToMany(() => Favorite, (favorite) => favorite.rental)
  favorites!: Favorite[];
}
