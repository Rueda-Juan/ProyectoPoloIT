import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rental } from './rental.entity';

@Entity('rental_photos')
export class RentalPhoto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Rental, (rental) => rental.photos, { onDelete: 'CASCADE' })
  rental!: Rental;

  @Column()
  url!: string;
}
