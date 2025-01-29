import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager } from 'typeorm';
import { Users } from './entities/user.entity';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: EntityManager
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = new Users(createUserDto)
    await this.usersRepository.save(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
