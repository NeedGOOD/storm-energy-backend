import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SolarpanelService } from './solarpanel.service';
import { CreateSolarpanelDto } from './dto/create-solarpanel.dto';
import { UpdateSolarpanelDto } from './dto/update-solarpanel.dto';
import { FilterSolarpanelDto } from './dto/filter-solarpanel.dto';

@Controller('solarpanel')
export class SolarpanelController {
  constructor(private readonly solarpanelService: SolarpanelService) { }

  @Post()
  create(@Body() createSolarpanelDto: CreateSolarpanelDto) {
    return this.solarpanelService.create(createSolarpanelDto);
  }

  @Get()
  findAll() {
    return this.solarpanelService.findAll();
  }

  @Get('filter')
  findSolarpanelByFilter(@Query() filters: FilterSolarpanelDto) {
    return this.solarpanelService.findSolarPanelByFilter(filters);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solarpanelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSolarpanelDto: UpdateSolarpanelDto) {
    return this.solarpanelService.update(id, updateSolarpanelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.solarpanelService.remove(id);
  }
}
