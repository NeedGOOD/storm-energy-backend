import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersRepository.findOneBy({ email: createUserDto.email });

      if (user) {
        throw new ConflictException('The user with this email already exists.');
      }

      const hashedPassword = await this.hashingPassword(createUserDto.password);

      const createUser = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword
      });

      return await this.usersRepository.save(createUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new BadRequestException('Failed to create user.');
    }
  }

  async findAll() {
    return await this.usersRepository.find({ relations: { systems: true } });
  }

  async findOne(id: number) {
    console.log('findOne userId:', id)
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: id !== undefined ? { id } : { id: -1 }, // якщо id буде undefined TypeORM його проігнорує і поверне перше значення в таблиця
        relations: { systems: true }
      });

      const { password, ...userWithoutPasword } = user;
      return userWithoutPasword;
    } catch (error) {
      throw new NotFoundException('User not found by id.');
    }
  }

  async findOneWithPassword(id: number) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: { id },
        relations: { systems: true }
      });
    } catch (error) {
      throw new NotFoundException('User not found by id.');
    }
  }

  async findUserByFilter(filters: Partial<FilterUserDto>) {
    const where: FilterUserDto = { ...filters };

    Object.keys(where).forEach(key => where[key] === undefined && delete where[key]);

    try {
      return await this.usersRepository.findOneOrFail({
        where,
        relations: { systems: true }
      });
    } catch (error) {
      throw new NotFoundException('User not found by filter.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email && await this.usersRepository.findOneBy({ email: updateUserDto.email })) {
      throw new ConflictException('This email is already taken.');
    }

    try {
      await this.usersRepository.update(id, updateUserDto);

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error updating user.');
    }
  }

  async updatePassword(id: number, updateUserPasswordDto: UpdateUserPasswordDto) {
    const user = await this.findOneWithPassword(id);

    const password: UpdateUserPasswordDto = updateUserPasswordDto;

    await AuthService.verificationPassword(password.oldPassword, user.password);

    if (password.newPassword !== password.confirmPassword) {
      throw new UnauthorizedException('Passwords do not match.');
    }

    try {
      const hashedNewPassword = await this.hashingPassword(password.newPassword);

      await this.usersRepository.update(id, { password: hashedNewPassword });

      return await this.findOne(id);
    } catch (error) {
      throw new UnauthorizedException('Error updating password.');
    }
  }

  // async remove(id: number) {
  //   return this.usersRepository.delete(id);
  // }

  async hashingPassword(password: string) {
    const salt = 10;

    return await bcrypt.hash(password, salt);
  }
}
