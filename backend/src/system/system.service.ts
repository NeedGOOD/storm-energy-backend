import { Injectable } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { EntityManager, Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Solarpanel } from 'src/solarpanel/entities/solarpanel.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Solarpanel)
    private readonly solarPanelRepository: Repository<Solarpanel>
  ) { }

  async createSystem(createSystemDto: CreateSystemDto) {
    const user = await this.usersRepository.findOne({ where: { id: createSystemDto.userId } })

    if (!user) {
      throw new Error('User not found')
    }

    const solarPanel = await this.solarPanelRepository.findOne({ where: { id: createSystemDto.solarPanelId }})

    const system = this.systemRepository.create({
      ...createSystemDto,
      user: user,
      solarPanel: solarPanel,
    })

    return await this.systemRepository.save(system)
  }

  async findAll() {
    return this.systemRepository.find({ relations: { user: true, solarPanel: true } })
  }

  async findOne(id: number) {
    return this.systemRepository.findOne({
      where: { id },
      relations: { user: true, solarPanel: true }
    })
  }

  async update(id: number, updateSystemDto: UpdateSystemDto) {
    await this.systemRepository.update(id, updateSystemDto)
    return this.systemRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return this.systemRepository.delete(id)
  }
}
