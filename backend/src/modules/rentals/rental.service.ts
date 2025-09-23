import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental-dto';
import { User } from '../user/user.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    createRentalDto: CreateRentalDto,
  ): Promise<Rental> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const rental = this.rentalRepository.create({
      ...createRentalDto,
      user,
    });

    return this.rentalRepository.save(rental);
  }

  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find({
      relations: ['user', 'photos', 'favorites'],
    });
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ['user', 'photos', 'favorites'],
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async update(id: string, dto: UpdateRentalDto): Promise<Rental> {
    const rental = await this.findOne(id);
    Object.assign(rental, dto);
    return this.rentalRepository.save(rental);
  }

  async remove(id: string): Promise<void> {
    const rental = await this.findOne(id);
    await this.rentalRepository.remove(rental);
  }
}
