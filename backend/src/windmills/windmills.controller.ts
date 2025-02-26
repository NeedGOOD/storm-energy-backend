import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WindmillsService } from './windmills.service';
import { CreateWindmillDto } from './dto/create-windmill.dto';
import { UpdateWindmillDto } from './dto/update-windmill.dto';

@Controller('windmills')
export class WindmillsController {
  constructor(private readonly windmillsService: WindmillsService) {}

  @Post()
  async create(@Body() createWindmillDto: CreateWindmillDto) {
    return this.windmillsService.create(createWindmillDto);
  }

  @Get()
  async findAll() {
    return this.windmillsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.windmillsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWindmillDto: UpdateWindmillDto) {
    return this.windmillsService.update(+id, updateWindmillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.windmillsService.remove(+id);
  }
}
