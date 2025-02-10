import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { EntityManager, Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) { }

  async createSystem(createSystemDto: CreateSystemDto) {
    const user = await this.usersRepository.findOne({ where: { id: createSystemDto.userId } })

    if (!user) {
      throw new Error('User not found')
    }

    const system = this.systemRepository.create({
      ...createSystemDto,
      user: user
    })

    return await this.systemRepository.save(system)
  }

  async findAll() {
    return this.systemRepository.find({ relations: { user: true } })
  }

  async findOne(id: number) {
    return this.systemRepository.findOne({
      where: { id },
      relations: { user: true }
    })
  }

  async update(id: number, updateSystemDto: UpdateSystemDto) {
    await this.systemRepository.update(id, updateSystemDto)
    return this.systemRepository.findOneBy({ id })
  }

  remove(id: number) {
    return `This action removes a #${id} system`;
  }
}
