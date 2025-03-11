import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAccumulatorDto } from './dto/create-accumulator.dto';
import { UpdateAccumulatorDto } from './dto/update-accumulator.dto';
import { Repository } from 'typeorm';
import { Accumulator } from './entities/accumulator.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccumulatorService {
  constructor(
    @InjectRepository(Accumulator)
    private readonly accumulatorRepository: Repository<Accumulator>
  ) { }

  async create(createAccumulatorDto: CreateAccumulatorDto) {
    try {
      const accumulator = this.accumulatorRepository.create(createAccumulatorDto);

      return await this.accumulatorRepository.save(accumulator);
    } catch (error) {
      throw new InternalServerErrorException('Error creating accumulator.');
    }
  }

  async findAll() {
    return await this.accumulatorRepository.find({ relations: { system: true } });
  }

  async findOne(id: number) {
    try {
      return await this.accumulatorRepository.findOneOrFail({
        where: { id },
        relations: { system: true }
      });
    } catch (error) {
      throw new NotFoundException('Accumulator not found by id.');
    }
  }

  async update(id: number, updateAccumulatorDto: UpdateAccumulatorDto) {
    await this.findOne(id);

    try {
      await this.accumulatorRepository.update(id, updateAccumulatorDto);

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error updating accumulator.');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.accumulatorRepository.delete(id);
  }
}
