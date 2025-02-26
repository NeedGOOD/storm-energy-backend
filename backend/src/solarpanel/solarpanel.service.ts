import { Injectable } from '@nestjs/common';
import { CreateSolarpanelDto } from './dto/create-solarpanel.dto';
import { UpdateSolarpanelDto } from './dto/update-solarpanel.dto';
import { EntityManager, Repository } from 'typeorm';
import { Solarpanel } from './entities/solarpanel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SolarpanelService {
  constructor(
    @InjectRepository(Solarpanel)
    private readonly solarPanelRepository: Repository<Solarpanel>
  ) { }

  async create(createSolarpanelDto: CreateSolarpanelDto) {
    const solarPanel = this.solarPanelRepository.create(createSolarpanelDto)
    return await this.solarPanelRepository.save(solarPanel)
  }

  async findAll() {
    return this.solarPanelRepository.find({ relations: { system: true } })
  }

  async findOne(id: number) {
    return this.solarPanelRepository.findOne({
      where: { id },
      relations: { system: true }
    })
  }

  async update(id: number, updateSolarpanelDto: UpdateSolarpanelDto) {
    await this.solarPanelRepository.update(id, updateSolarpanelDto)
    return this.solarPanelRepository.findOneBy({ id })
  }

  async remove(id: number) {
    this.solarPanelRepository.delete(id)
  }
}
