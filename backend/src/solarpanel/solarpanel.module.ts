import { Module } from '@nestjs/common';
import { SolarpanelService } from './solarpanel.service';
import { SolarpanelController } from './solarpanel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solarpanel as SolarPanel } from './entities/solarpanel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolarPanel])],
  controllers: [SolarpanelController],
  providers: [SolarpanelService],
})
export class SolarpanelModule { }
