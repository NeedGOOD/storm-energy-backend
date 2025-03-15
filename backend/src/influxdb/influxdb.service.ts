import { InfluxDB, Point, QueryApi, WriteApi } from "@influxdata/influxdb-client";
import { Injectable, NotAcceptableException } from "@nestjs/common";
import { BodyFluxQueryRealTime } from "src/interfaces/influx.interface";

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

  async querySolarpanelRealDataTime(userId: number, systemId: number, bodyFluxQuery: BodyFluxQueryRealTime) {
    try {
      const fluxQuery =
        `from(bucket: "${process.env.INFLUX_BUCKET}")
          |> range(start: 0)
          |> filter(fn: (r) => r._measurement == "${bodyFluxQuery.typeProject}" and r.userId == "${userId}" and r.systemId == "${systemId}")
          |> sort(columns: ["_time"], desc: true)
          |> limit(n: 1)`;

      console.log(fluxQuery);

      const myQuery = async () => {
        for await (const { values, tableMeta } of this.queryApi.iterateRows(fluxQuery)) {
          const o = tableMeta.toObject(values)
          console.log(
            `${o._time} ${o._measurement}: ${o._field}=${o._value}`
          );
        }
      };

      myQuery();
    } catch (error) {
      throw new NotAcceptableException('error.');
    }
  }
}
