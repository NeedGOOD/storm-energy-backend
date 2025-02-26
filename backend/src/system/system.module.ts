import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/entities/user.entity';
import { SolarpanelModule } from 'src/solarpanel/solarpanel.module';
import { Solarpanel } from 'src/solarpanel/entities/solarpanel.entity';
import { AccumulatorModule } from 'src/accumulator/accumulator.module';
import { Accumulator } from 'src/accumulator/entities/accumulator.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([System, Users, Solarpanel, Accumulator]),
    UsersModule,
    SolarpanelModule,
    AccumulatorModule
  ],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule { }
