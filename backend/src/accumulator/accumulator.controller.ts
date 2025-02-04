import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccumulatorService } from './accumulator.service';
import { CreateAccumulatorDto } from './dto/create-accumulator.dto';
import { UpdateAccumulatorDto } from './dto/update-accumulator.dto';

@Controller('accumulator')
export class AccumulatorController {
  constructor(private readonly accumulatorService: AccumulatorService) { }

  @Post()
  async create(@Body() createAccumulatorDto: CreateAccumulatorDto) {
    return this.accumulatorService.create(createAccumulatorDto);
  }

  @Get()
  async findAll() {
    return this.accumulatorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accumulatorService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccumulatorDto: UpdateAccumulatorDto) {
    return this.accumulatorService.update(+id, updateAccumulatorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accumulatorService.remove(+id);
  }
}
