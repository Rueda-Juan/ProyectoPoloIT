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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('rentals') // Grupo de endpoints en Swagger
@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Crear un alquiler asociado a un usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario propietario' })
  @ApiBody({ type: CreateRentalDto })
  @ApiResponse({
    status: 201,
    description: 'Alquiler creado exitosamente',
    type: Rental,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los alquileres' })
  @ApiResponse({
    status: 200,
    description: 'Lista de alquileres',
    type: [Rental],
  })
  findAll(): Promise<Rental[]> {
    return this.rentalService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alquiler por su ID' })
  @ApiParam({ name: 'id', description: 'ID del alquiler' })
  @ApiResponse({
    status: 200,
    description: 'Alquiler encontrado',
    type: Rental,
  })
  @ApiResponse({ status: 404, description: 'Alquiler no encontrado' })
  findOne(@Param('id') id: string): Promise<Rental> {
    return this.rentalService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un alquiler existente' })
  @ApiParam({ name: 'id', description: 'ID del alquiler a actualizar' })
  @ApiBody({ type: UpdateRentalDto })
  @ApiResponse({
    status: 200,
    description: 'Alquiler actualizado',
    type: Rental,
  })
  @ApiResponse({ status: 404, description: 'Alquiler no encontrado' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRentalDto,
  ): Promise<Rental> {
    return this.rentalService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alquiler por ID' })
  @ApiParam({ name: 'id', description: 'ID del alquiler a eliminar' })
  @ApiResponse({ status: 200, description: 'Alquiler eliminado' })
  @ApiResponse({ status: 404, description: 'Alquiler no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.rentalService.remove(id);
  }
}
