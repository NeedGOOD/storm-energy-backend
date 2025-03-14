import { Module } from '@nestjs/common';
import { SolarpanelService } from './solarpanel.service';
import { SolarpanelController } from './solarpanel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solarpanel as SolarPanel } from './entities/solarpanel.entity';
import { InfluxDBModule } from 'src/influxdb/influxdb.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolarPanel]),
    InfluxDBModule
  ],
  controllers: [SolarpanelController],
  providers: [SolarpanelService],
  exports: [SolarpanelService]
})
export class SolarpanelModule { }
