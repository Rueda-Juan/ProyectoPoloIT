import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RentalService } from './rental.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental-dto';
import { Rental } from './rental.entity';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.create(userId, dto);
  }

  @Get()
  findAll(): Promise<Rental[]> {
    return this.rentalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rental> {
    return this.rentalService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rentalService.remove(id);
  }
}
