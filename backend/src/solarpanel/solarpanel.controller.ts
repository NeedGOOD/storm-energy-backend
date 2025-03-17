import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
// import { SolarpanelService } from './solarpanel.service';
import { CreateSolarpanelDto } from './dto/create-solarpanel.dto';
import { UpdateSolarpanelDto } from './dto/update-solarpanel.dto';
import { FilterSolarpanelDto } from './dto/filter-solarpanel.dto';
import { InfluxDBService } from 'src/influxdb/influxdb.service';
import { BodyFluxQueryRealTime } from 'src/interfaces/influx.interface';

@Controller('solarpanel')
export class SolarpanelController {
  constructor(
    // private readonly solarpanelService: SolarpanelService,
    private readonly influxDBService: InfluxDBService
  ) { }

  // Поки що такий варіант
  @Post(':userId/:systemId')
  writeValues(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('systemId', ParseIntPipe) systemId: number,
    @Body() currentPower: { currentPower: number }
  ) {
    return this.influxDBService.writeData(userId, systemId, currentPower.currentPower);
  }

  @Get(':userId/:systemId')
  queryValues(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('systemId', ParseIntPipe) systemId: number,
    @Body() bodyFluxQueryRealTime: BodyFluxQueryRealTime
  ) {
    return this.influxDBService.querySolarpanelRealDataTime(userId, systemId, bodyFluxQueryRealTime);
  }

  // @Post()
  // create(@Body() createSolarpanelDto: CreateSolarpanelDto) {
  //   return this.solarpanelService.create(createSolarpanelDto);
  // }

  // @Get()
  // findAll() {
  //   return this.solarpanelService.findAll();
  // }

  // @Get('filter')
  // findSolarpanelByFilter(@Query() filters: FilterSolarpanelDto) {
  //   return this.solarpanelService.findSolarPanelByFilter(filters);
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.solarpanelService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id', ParseIntPipe) id: number, @Body() updateSolarpanelDto: UpdateSolarpanelDto) {
  //   return this.solarpanelService.update(id, updateSolarpanelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.solarpanelService.remove(id);
  // }
}
