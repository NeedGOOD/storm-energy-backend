import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { Repository } from 'typeorm';
import { System } from './entities/system.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
// import { SolarpanelService } from 'src/solarpanel/solarpanel.service';
// import { AccumulatorService } from 'src/accumulator/accumulator.service';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
    private readonly userService: UsersService,
    // private readonly solarPanelService: SolarpanelService,
    // private readonly accumulatorService: AccumulatorService
  ) { }

  async createSystem(createSystemDto: CreateSystemDto) {
    const user = await this.userService.findOne(createSystemDto.userId);

    // const solarPanel = await this.solarPanelService.findOne(createSystemDto.solarPanelId);

    // const accumulator = await this.accumulatorService.findOne(createSystemDto.accumulatorId);

    try {
      const system = this.systemRepository.create({
        ...createSystemDto,
        user,
      });

      return await this.systemRepository.save(system);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create system.');
    }
  }

  async findAll() {
    return await this.systemRepository.find({
      relations: { user: true }
    });
  }

  async findOne(id: number) {
    try {
      return await this.systemRepository.findOneOrFail({
        where: { id },
        relations: { user: true }
      });
    } catch (error) {
      throw new NotFoundException('System not found by id.');
    }
  }

  async update(id: number, updateSystemDto: UpdateSystemDto) {
    await this.findOne(id);

    try {
      await this.systemRepository.update(id, updateSystemDto);

      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Error updating system.');
    }
  }

  async remove(id: number) {
    return this.systemRepository.delete(id)
  }
}
