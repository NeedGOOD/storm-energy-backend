import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { InfluxDBService } from 'src/influxdb/influxdb.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly brokerUrl = 'mqtt://broker.emqx.io:1883';
  private readonly topic = 'randomnumbers9734628/storm_energy_project/sensorACHS';
  private readonly logger = new Logger(MqttService.name);

  constructor(private readonly influxDBService: InfluxDBService) { }

  onModuleInit() {
    this.connect();
  }

  private connect() {
    this.client = mqtt.connect(this.brokerUrl);

    this.client.on('connect', () => {
      this.logger.log('Підключено до брокера MQTT');
      this.subscribe(this.topic);
    });

    this.client.on('error', (err) => {
      this.logger.error('Помилка зʼєднання:', err.message);
    });

    this.client.on('message', (topic, message) => {


      this.logger.log(`Отримано повідомлення з топіку ${topic}: ${message.toString()}`);
    });
  }

  private subscribe(topic: string) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        this.logger.error(`Помилка підписки на топік ${topic}:`, err.message);
      } else {
        this.logger.log(`Підписано на топік: ${topic}`);
      }
    });
  }
}
