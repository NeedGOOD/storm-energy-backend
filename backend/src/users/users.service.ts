import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return await this.usersRepository.save(user)
  }

  async findAll() {
    return this.usersRepository.find({ relations: { systems: true } })
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: { systems: true }
    })
  }

  async findUsersByFilter(filters: Partial<FilterUserDto>) {
    const where: FilterUserDto = { ...filters }

    Object.keys(where).forEach(key => where[key] === undefined && delete where[key])

    const user = await this.usersRepository.findOne({
      where,
      relations: { systems: true }
    })

    if (!user) {
      throw new BadRequestException('User not found by filter')
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto)
    return this.usersRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
