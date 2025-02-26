import { Module } from '@nestjs/common';
import { AccumulatorService } from './accumulator.service';
import { AccumulatorController } from './accumulator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accumulator } from './entities/accumulator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accumulator])],
  controllers: [AccumulatorController],
  providers: [AccumulatorService],
  exports: [AccumulatorService]
})
export class AccumulatorModule { }
