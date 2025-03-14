import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SystemModule } from './system/system.module';
import { AccumulatorModule } from './accumulator/accumulator.module';
import { WindmillsModule } from './windmills/windmills.module';
import { SolarpanelModule } from './solarpanel/solarpanel.module';
import { AuthModule } from './auth/auth.module';
import { InfluxDBModule } from './influxdb/influxdb.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    SystemModule,
    AccumulatorModule,
    WindmillsModule,
    SolarpanelModule,
    AuthModule,
    InfluxDBModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
