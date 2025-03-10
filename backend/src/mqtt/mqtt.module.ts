import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { InfluxModule } from 'src/influx/influx/influx.module';

@Module({
  providers: [MqttService],
  exports: [MqttService],
  imports: [InfluxModule]
})
export class MqttModule implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    console.log('MQTT Module initialized');
  }

  async onModuleDestroy() {
    console.log('MQTT Module destroyed');
  }
}
