import { Module } from '@nestjs/common';
import { GatewayGateway } from './gateway.gateway';
import { InfluxDBModule } from 'src/influxdb/influxdb.module';

@Module({
  imports: [InfluxDBModule],
  providers: [GatewayGateway]
})
export class GatewayModule { }
