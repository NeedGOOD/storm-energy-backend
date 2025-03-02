import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { SolarpanelService } from 'src/solarpanel/solarpanel.service';
import { AccumulatorService } from 'src/accumulator/accumulator.service';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
    private readonly userService: UsersService,
    private readonly solarPanelService: SolarpanelService,
    private readonly accumulatorService: AccumulatorService
  ) { }

  async createSystem(createSystemDto: CreateSystemDto) {
    const user = await this.userService.findOne(createSystemDto.userId);

    const solarPanel = await this.solarPanelService.findOne(createSystemDto.solarPanelId);

    const accumulator = await this.accumulatorService.findOne(createSystemDto.accumulatorId);

    try {
      const system = this.systemRepository.create({
        ...createSystemDto,
        user,
        solarPanel,
        accumulator
      });

      return await this.systemRepository.save(system);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create system.');
    }
  }

  async findAll() {
    return await this.systemRepository.find({
      relations: {
        user: true,
        solarPanel: true,
        accumulator: true
      }
    });
  }

  async findOne(id: number) {
    return this.systemRepository.findOne({
      where: { id },
      relations: { user: true, solarPanel: true, accumulator: true }
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
