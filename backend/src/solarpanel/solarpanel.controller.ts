import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolarpanelService } from './solarpanel.service';
import { CreateSolarpanelDto } from './dto/create-solarpanel.dto';
import { UpdateSolarpanelDto } from './dto/update-solarpanel.dto';

@Controller('solarpanel')
export class SolarpanelController {
  constructor(private readonly solarpanelService: SolarpanelService) {}

  @Post()
  async create(@Body() createSolarpanelDto: CreateSolarpanelDto) {
    return this.solarpanelService.create(createSolarpanelDto);
  }

  @Get()
  async findAll() {
    return this.solarpanelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.solarpanelService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSolarpanelDto: UpdateSolarpanelDto) {
    return this.solarpanelService.update(+id, updateSolarpanelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solarpanelService.remove(+id);
  }
}
