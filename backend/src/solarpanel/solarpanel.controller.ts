import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SolarpanelService } from './solarpanel.service';
import { CreateSolarpanelDto } from './dto/create-solarpanel.dto';
import { UpdateSolarpanelDto } from './dto/update-solarpanel.dto';
import { FilterSolarpanelDto } from './dto/filter-solarpanel.dto';
import { InfluxDBService } from 'src/influxdb/influxdb.service';

@Controller('solarpanel')
export class SolarpanelController {
  constructor(
    private readonly solarpanelService: SolarpanelService,
    private readonly influxDBService: InfluxDBService
  ) { }


  @Post(':userId/:systemId')
  async writeValues(
    @Param('userId') userId: number,
    @Param('systemId') systemId: number,
    @Body() data: { voltage: number, current: number }
  ) {
    console.log('controller');
    console.log(userId);
    console.log(systemId);
    console.log(data.voltage);
    console.log(data.current);

    return await this.influxDBService.saveSolarpanelData(userId, systemId, data.voltage, data.current);
  }

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
