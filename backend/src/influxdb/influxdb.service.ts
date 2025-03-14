import { InfluxDB, Point, QueryApi, WriteApi } from "@influxdata/influxdb-client";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { BodyFluxQuery } from "src/interfaces/influx.interface";

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

    this.queryApi = this.influx.getQueryApi(
      process.env.INFLUX_ORG,
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

  // If you write -1h and nothing appears, you need to write a larger number
  async querySolarpanelData(userId: number, systemId: number, bodyFluxQuery: BodyFluxQuery) {
    try {
      console.log('start =', typeof bodyFluxQuery.startTime, bodyFluxQuery.startTime);
      console.log('type =', typeof bodyFluxQuery.typeProject, bodyFluxQuery.typeProject);

      const fluxQuery =
        `from(bucket: "${process.env.INFLUX_BUCKET}")
          |> range(start: ${bodyFluxQuery.startTime})
          |> filter(fn: (r) => r._measurement == "${bodyFluxQuery.typeProject}")`;

      console.log(fluxQuery);

      const myQuery = async () => {
        for await (const { values, tableMeta } of this.queryApi.iterateRows(fluxQuery)) {
          const o = tableMeta.toObject(values)
          console.log(
            `${o._time} ${o._measurement}: ${o._field}=${o._value}`
          );
        }
      };

      await myQuery();
    } catch (error) {
      throw new NotAcceptableException('error.');
    }
  }
}
