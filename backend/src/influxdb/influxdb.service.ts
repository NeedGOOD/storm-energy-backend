import { InfluxDB, Point, QueryApi, WriteApi } from "@influxdata/influxdb-client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InfluxDBService {
  private influx: InfluxDB;
  private writeApi: WriteApi;
  private queryApi: QueryApi;

  constructor() {
    this.influx = new InfluxDB({
      url: process.env.INFLUX_URL,
      token: process.env.INFLUX_ADMIN_TOKEN,
    });

    this.writeApi = this.influx.getWriteApi(
      process.env.INFLUX_ORG,
      process.env.INFLUX_BUCKET,
    );
  }

  async writeSolarpanelData(userId: number, systemId: number, voltage: number, current: number) {
    const point = new Point('solar_panel')
      .tag('userId', String(userId))
      .tag('systemId', String(systemId))
      .floatField('voltage', voltage)
      .floatField('current', current);

    this.writeApi.writePoint(point);

    await this.writeApi.flush();
  }
}
