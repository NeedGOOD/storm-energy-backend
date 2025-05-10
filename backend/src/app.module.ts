import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { InfluxDBModule } from './influxdb/influxdb.module';
import { GatewayModule } from './gateway/gateway.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    SystemModule,
    AuthModule,
    InfluxDBModule,
    GatewayModule,
    MqttModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
