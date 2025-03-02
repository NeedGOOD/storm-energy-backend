import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) { }

  @Post()
  async create(@Body() createSystemDto: CreateSystemDto) {
    return this.systemService.createSystem(createSystemDto);
  }

  @Get()
  async findAll() {
    return this.systemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.systemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSystemDto: UpdateSystemDto) {
    return this.systemService.update(id, updateSystemDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.systemService.remove(id);
  }
}
