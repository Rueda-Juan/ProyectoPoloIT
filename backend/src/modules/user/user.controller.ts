import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./user.entity";
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create (@Body() dto: CreateUserDto): Promise<User>{
        return this.userService.create(dto);
    }

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User>{
        return this.userService.findOne(id);
    }

    @Patch(':id/password')
    async updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto): Promise<{message: string}> {
        await this.userService.updatePassword(id, dto);
        return {message: 'password updated succesfully'};
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void>{
        return this.userService.remove(id);
    }
}