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
    private readonly accumulatorRepository: Repository<Accumulator>
  ) { }

  async create(createAccumulatorDto: CreateAccumulatorDto) {
    const accumulator = await this.accumulatorRepository.create(createAccumulatorDto)
    await this.accumulatorRepository.save(accumulator)
  }

  async findAll() {
    return this.accumulatorRepository.find({ relations: { system: true } })
  }

  async findOne(id: number) {
    return this.accumulatorRepository.findOne({
      where: { id },
      relations: { system: true }
    })
  }

  async update(id: number, updateAccumulatorDto: UpdateAccumulatorDto) {
    await this.accumulatorRepository.update(id, updateAccumulatorDto)
    return this.accumulatorRepository.findOneBy({ id })
  }

  async remove(id: number) {
    await this.accumulatorRepository.delete(id)
  }
}
