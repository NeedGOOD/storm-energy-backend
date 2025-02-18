import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { email: createUserDto.email } });

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
    return this.usersRepository.find({ relations: { systems: true } });
  }

  async findOne(id: number) {
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
    await this.usersRepository.update(id, updateUserDto)
    return this.usersRepository.findOneBy({ id })
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword, confirmPassword } = updatePasswordDto;

    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException('Passwords do not match');
    }

    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const hashedNewPassword = await this.hashingPassword(newPassword);
    user.password = hashedNewPassword;
    await this.usersRepository.save(user);

  }

  async remove(id: number) {
    return this.usersRepository.delete(id)
  }

  async hashingPassword(password: string) {
    const salt = 10;

    return await bcrypt.hash(password, salt);
  }
}
