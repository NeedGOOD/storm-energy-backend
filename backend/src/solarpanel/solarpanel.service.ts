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
    private readonly solarPanelRepository: Repository<Solarpanel>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createSolarpanelDto: CreateSolarpanelDto) {
    const solarPanel = new Solarpanel(createSolarpanelDto)
    await this.entityManager.save(solarPanel)
  }

  async findAll() {
    return this.solarPanelRepository.find()
  }

  async findOne(id: number) {
    return this.solarPanelRepository.findOneBy({ id })
  }

  update(id: number, updateSolarpanelDto: UpdateSolarpanelDto) {
    return `This action updates a #${id} solarpanel`;
  }

  remove(id: number) {
    return `This action removes a #${id} solarpanel`;
  }
}
