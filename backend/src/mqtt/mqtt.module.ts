import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { InfluxDBModule } from 'src/influxdb/influxdb.module';

@Module({
  imports: [InfluxDBModule],
  providers: [MqttService],
  exports: [MqttService]
})
export class MqttModule { }
