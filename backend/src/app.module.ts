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
import { MqttModule } from './mqtt/mqtt.module';
import { InfluxService } from './influx/influx/influx.service';
import { InfluxModule } from './influx/influx/influx.module';

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
    InfluxModule
    // MqttModule
  ],
  controllers: [AppController],
  providers: [AppService, InfluxService],
})
export class AppModule { }
