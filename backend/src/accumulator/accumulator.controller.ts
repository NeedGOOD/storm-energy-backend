import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accumulatorService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateAccumulatorDto: UpdateAccumulatorDto) {
    return this.accumulatorService.update(id, updateAccumulatorDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.accumulatorService.remove(id);
  }
}
