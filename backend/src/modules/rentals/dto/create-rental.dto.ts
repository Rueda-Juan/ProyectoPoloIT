import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  Min,
  Max,
} from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({
    description: 'Título de la propiedad',
    example: 'Departamento en Palermo',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Dirección de la propiedad',
    example: 'Av. Santa Fe 1234, Buenos Aires',
  })
  @IsString()
  address!: string;

  @ApiProperty({
    description: 'Cantidad de habitaciones',
    example: 3,
  })
  @IsNumber()
  rooms!: number;

  @ApiPropertyOptional({
    description: 'Accesibilidad para personas con movilidad reducida',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  accessibility?: boolean;

  @ApiProperty({
    description: 'Precio de alquiler en dólares',
    example: 1200,
  })
  @IsNumber()
  price!: number;

  @ApiPropertyOptional({
    description: 'Área total de la propiedad en metros cuadrados',
    example: 85,
  })
  @IsNumber()
  @IsOptional()
  area?: number;

  @ApiPropertyOptional({
    description: 'Descripción detallada de la propiedad',
    example: 'Amplio departamento con balcón y vista al parque',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Fecha a partir de la cual estará disponible',
    example: '2025-10-01',
  })
  @IsDateString()
  @IsOptional()
  availableFrom?: Date;
  @ApiProperty({
    description: 'Latitud de la propiedad',
    example: -30.1234,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat!: number;

  @ApiProperty({
    description: 'Longitud de la propiedad',
    example: -60.1234,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng!: number;
}
