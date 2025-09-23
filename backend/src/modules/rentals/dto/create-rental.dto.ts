import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateRentalDto {
  @IsString()
  title!: string;

  @IsString()
  address!: string;

  @IsNumber()
  rooms!: number;

  @IsBoolean()
  @IsOptional()
  accessibility?: boolean;

  @IsNumber()
  price!: number;

  @IsNumber()
  @IsOptional()
  area?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  availableFrom?: Date;
}
