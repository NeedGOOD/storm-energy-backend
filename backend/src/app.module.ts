import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SystemModule } from './system/system.module';
import { AccumulatorModule } from './accumulator/accumulator.module';
import { WindmillsModule } from './windmills/windmills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    SystemModule,
    AccumulatorModule,
    WindmillsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
