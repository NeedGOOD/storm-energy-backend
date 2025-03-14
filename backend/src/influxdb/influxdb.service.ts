import { InfluxDB, Point, QueryApi, WriteApi } from "@influxdata/influxdb-client";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class InfluxDBService {
  private influx: InfluxDB;
  private writeApi: WriteApi;
  private queryApi: QueryApi;

  // constructor() {
  //   const url = process.env.INFLUX_URL || 'http://localhost:8086';
  //   const token = process.env.INFLUX_TOKEN || 'e9ihX-MG-ePpwLPWCfzOd5_PknER8xwopWWZHsnnqKG8qyca5CqPGnTv4UBmM_QkQMz9GKmYSp_yhBWhNlgbTA==';
  //   const org = process.env.INFLUX_ORG || 'stormenergy';
  //   const bucket = process.env.INFLUX_BUCKET || 'stormtest';

  //   this.influx = new InfluxDB({ url, token });
  //   this.writeApi = this.influx.getWriteApi(org, bucket);
  //   this.queryApi = this.influx.getQueryApi(org);
  // }

  constructor(private configService: ConfigService) {
    this.influx = new InfluxDB({
      url: this.configService.getOrThrow("INFLUX_URL"),
      token: this.configService.getOrThrow("INFLUX_ADMIN_TOKEN"),
    });

    this.writeApi = this.influx.getWriteApi(
      this.configService.getOrThrow("INFLUX_ORG"),
      this.configService.getOrThrow("INFLUX_BUCKET"),
    );
  }

  async saveSolarpanelData(userId: number, systemId: number, voltage: number, current: number) {
    console.log('service');

    const point = new Point('solar_panel')
      .tag('userId', String(userId))
      .tag('systemId', String(systemId))
      .floatField('voltage', voltage)
      .floatField('current', current);

    this.writeApi.writePoint(point);

    return await this.writeApi.flush();
  }
}
