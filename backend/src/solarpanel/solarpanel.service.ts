// import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { CreateSolarpanelDto } from './dto/create-solarpanel.dto';
// import { UpdateSolarpanelDto } from './dto/update-solarpanel.dto';
// import { Repository } from 'typeorm';
// import { Solarpanel } from './entities/solarpanel.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { FilterSolarpanelDto } from './dto/filter-solarpanel.dto';

// @Injectable()
// export class SolarpanelService {
//   constructor(
//     @InjectRepository(Solarpanel)
//     private readonly solarPanelRepository: Repository<Solarpanel>,
//   ) { }

//   async create(createSolarpanelDto: CreateSolarpanelDto) {
//     const solarPanel = await this.solarPanelRepository.findOneBy({
//       name: createSolarpanelDto.name,
//       model: createSolarpanelDto.model
//     });

//     if (solarPanel) {
//       throw new ConflictException('The solar panel with this name or model already exists.');
//     }

//     try {
//       const solarPanel = this.solarPanelRepository.create(createSolarpanelDto);

//       return await this.solarPanelRepository.save(solarPanel);
//     } catch (error) {
//       throw new ConflictException('Failed to create solar panel.');
//     }
//   }

//   async findAll() {
//     return await this.solarPanelRepository.find({ relations: { system: true } });
//   }

//   async findOne(id: number) {
//     try {
//       return await this.solarPanelRepository.findOneOrFail({
//         where: { id },
//         relations: { system: true }
//       });
//     } catch (error) {
//       throw new NotFoundException('Solar panel not found by id.');
//     }
//   }

//   async findSolarPanelByFilter(filters: Partial<FilterSolarpanelDto>) {
//     const where: FilterSolarpanelDto = { ...filters };

//     Object.keys(where).forEach(key => where[key] === undefined && delete where[key]);

//     try {
//       return await this.solarPanelRepository.findOneOrFail({
//         where,
//         relations: { system: true }
//       });
//     } catch (error) {
//       throw new NotFoundException('Solar panel not found by filter.');
//     }
//   }

//   async update(id: number, updateSolarpanelDto: UpdateSolarpanelDto) {
//     await this.findOne(id);

//     try {
//       await this.solarPanelRepository.update(id, updateSolarpanelDto);

//       return await this.findOne(id);
//     } catch (error) {
//       throw new InternalServerErrorException('Error updating solar panel.');
//     }
//   }

//   async remove(id: number) {
//     await this.findOne(id);

//     await this.solarPanelRepository.delete(id);
//   }
// }
