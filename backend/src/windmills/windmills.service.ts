import { Injectable } from '@nestjs/common';
import { CreateWindmillDto } from './dto/create-windmill.dto';
import { UpdateWindmillDto } from './dto/update-windmill.dto';
import { EntityManager, Repository } from 'typeorm';
import { Windmill } from './entities/windmill.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WindmillsService {
  constructor(
    @InjectRepository(Windmill)
    private readonly windmillsRepository: Repository<Windmill>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createWindmillDto: CreateWindmillDto) {
    const windmill = new Windmill(createWindmillDto)
    await this.entityManager.save(windmill)
  }

  async findAll() {
    return this.windmillsRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} windmill`;
  }

  update(id: number, updateWindmillDto: UpdateWindmillDto) {
    return `This action updates a #${id} windmill`;
  }

  remove(id: number) {
    return `This action removes a #${id} windmill`;
  }
}
