import { Injectable } from '@nestjs/common';
import { CreateAccumulatorDto } from './dto/create-accumulator.dto';
import { UpdateAccumulatorDto } from './dto/update-accumulator.dto';
import { EntityManager, Repository } from 'typeorm';
import { Accumulator } from './entities/accumulator.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccumulatorService {
  constructor(
    @InjectRepository(Accumulator)
    private readonly accumulatorRepository: Repository<Accumulator>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createAccumulatorDto: CreateAccumulatorDto) {
    const accumulator = new Accumulator(createAccumulatorDto)
    await this.entityManager.save(accumulator)
  }

  async findAll() {
    return this.accumulatorRepository.find()
  }

  async findOne(id: number) {
    return this.accumulatorRepository.findOneBy({ id })
  }

  update(id: number, updateAccumulatorDto: UpdateAccumulatorDto) {
    return `This action updates a #${id} accumulator`;
  }

  remove(id: number) {
    return `This action removes a #${id} accumulator`;
  }
}
