import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { InfluxService } from 'src/influx/influx/influx.service';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(private readonly influxService: InfluxService) { }

  onModuleInit() {
    this.client = mqtt.connect('mqtt://host.docker.internal:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      this.client.subscribe('system/data');
    });

    this.client.on('message', async (topic, message) => {
      console.log(`Received message from ${topic}: ${message.toString()}`);

      const value = parseFloat(message.toString());
      if (!isNaN(value)) {
        await this.influxService.writeMeasurement(topic, value);
      }
    });

    this.client.on('error', (error) => {
      console.error('MQTT Error:', error);
    });
  }

  onModuleDestroy() {
    this.influxService.closeConnection();
  }

  publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }
}
