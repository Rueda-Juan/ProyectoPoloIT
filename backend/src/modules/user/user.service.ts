import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { promises } from 'dns';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(dto: CreateUserDto): Promise<User> {
        const hashedPasword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({ ...dto, password: hashedPasword });

        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException(`user with ID: ${id} not found`);

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) throw new NotFoundException(`user with email:  ${email} not found`);

        return user;
    }

    async remove(id: string): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException(`user with ID ${id} not found`);

    }

    async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User with ID: ${id} not found`);

        Object.assign(user, dto);
        return this.userRepository.save(user);
    }


    async updatePassword(id: string, dto: UpdatePasswordDto): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException(`user with ID: ${id} not found`);

        const isPaswordValid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isPaswordValid) throw new BadRequestException('current password is incorrect');

        const hashedNewPasword = await bcrypt.hash(dto.newPassword, 10);
        user.password = hashedNewPasword;

        await this.userRepository.save(user);
    }
}