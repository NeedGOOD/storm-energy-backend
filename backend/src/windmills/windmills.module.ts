import { Module } from '@nestjs/common';
import { WindmillsService } from './windmills.service';
import { WindmillsController } from './windmills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Windmill } from './entities/windmill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Windmill])],
  controllers: [WindmillsController],
  providers: [WindmillsService],
})
export class WindmillsModule { }
