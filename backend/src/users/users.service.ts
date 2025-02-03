import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly entityManager: EntityManager
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = new Users(createUserDto)
    await this.entityManager.save(user)
  }

  async findAll() {
    return this.usersRepository.find()
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
