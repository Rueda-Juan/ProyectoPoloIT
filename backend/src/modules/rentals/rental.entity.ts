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
import { ApiProperty } from '@nestjs/swagger';

@Entity('rentals')
export class Rental {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0',
    description: 'ID único del alquiler',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    type: () => User,
    description: 'Usuario propietario del alquiler',
  })
  @ManyToOne(() => User, (user) => user.rentals, { onDelete: 'CASCADE' })
  user!: User;

  @ApiProperty({
    example: 'Departamento en Palermo',
    description: 'Título del anuncio',
  })
  @Column({ length: 150 })
  title!: string;

  @ApiProperty({
    example: 'Av. Santa Fe 1234, Buenos Aires',
    description: 'Dirección del alquiler',
  })
  @Column({ length: 200 })
  address!: string;

  @ApiProperty({ example: 3, description: 'Cantidad de habitaciones' })
  @Column('int')
  rooms!: number;

  @ApiProperty({
    example: true,
    description: 'Indica si es accesible para personas con movilidad reducida',
  })
  @Column({ default: false })
  accessibility!: boolean;

  @ApiProperty({ example: 750.5, description: 'Precio mensual en USD' })
  @Index()
  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @ApiProperty({ example: 80.5, description: 'Superficie total en m2' })
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  area!: number;

  @ApiProperty({
    example: 'Luminoso y con balcón',
    description: 'Descripción opcional del alquiler',
  })
  @Column('text', { nullable: true, default: '' })
  description!: string;

  @ApiProperty({
    example: '2025-10-01',
    description: 'Fecha a partir de la cual está disponible',
  })
  @Column({ name: 'available_from', type: 'date', nullable: true })
  availableFrom!: Date;

  @ApiProperty({
    example: '2025-09-15T18:25:43.511Z',
    description: 'Fecha de creación del anuncio',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ApiProperty({
    type: () => [RentalPhoto],
    description: 'Fotos asociadas al alquiler',
  })
  @OneToMany(() => RentalPhoto, (photo) => photo.rental, { cascade: true })
  photos!: RentalPhoto[];

  @ApiProperty({
    type: () => [Favorite],
    description: 'Usuarios que marcaron este alquiler como favorito',
  })
  @OneToMany(() => Favorite, (favorite) => favorite.rental)
  favorites!: Favorite[];
}
