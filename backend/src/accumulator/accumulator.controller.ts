import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AccumulatorService } from './accumulator.service';
import { CreateAccumulatorDto } from './dto/create-accumulator.dto';
import { UpdateAccumulatorDto } from './dto/update-accumulator.dto';

@Controller('accumulator')
export class AccumulatorController {
  constructor(private readonly accumulatorService: AccumulatorService) { }

  @Post()
  create(@Body() createAccumulatorDto: CreateAccumulatorDto) {
    return this.accumulatorService.create(createAccumulatorDto);
  }

  @Get()
  findAll() {
    return this.accumulatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accumulatorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccumulatorDto: UpdateAccumulatorDto) {
    return this.accumulatorService.update(id, updateAccumulatorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accumulatorService.remove(id);
  }
}
