import { Injectable } from '@nestjs/common';
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxService {
  private client: InfluxDB;
  private writeApi: WriteApi;

  constructor(private configService: ConfigService) {
    this.client = new InfluxDB({
      url: this.configService.getOrThrow("INFLUXDB_URL"),
      token: this.configService.getOrThrow("INFLUXDB_ADMIN_TOKEN"),
    });

    this.writeApi = this.client.getWriteApi(
      this.configService.getOrThrow("INFLUXDB_ORG"),
      this.configService.getOrThrow("INFLUXDB_BUCKET"),
    );
  }

  async writeMeasurement(topic: string, value: number) {
    console.log('here');
    
    const point = new Point(topic)
      .floatField('value', value)
      .timestamp(new Date());

    console.log(`Saving to InfluxDB: ${topic} => ${value}`);
    this.writeApi.writePoint(point);
    return await this.writeApi.flush();
  }

  async closeConnection() {
    console.log('Closing InfluxDB connection...');
    this.writeApi.close();
  }
}
