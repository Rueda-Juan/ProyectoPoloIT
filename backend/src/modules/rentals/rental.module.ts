import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rental.entity';
import { User } from '../user/user.entity';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, User])],
  providers: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
