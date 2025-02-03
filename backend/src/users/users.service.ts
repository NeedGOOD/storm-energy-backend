import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto)
    return await this.usersRepository.findOneBy({ id })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
