import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([System, Users]),
    UsersModule
  ],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule { }
