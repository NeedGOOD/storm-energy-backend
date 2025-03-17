import { InfluxDB, Point, QueryApi, WriteApi } from "@influxdata/influxdb-client";
import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { BodyFluxQueryRealTime, BodyHandleData } from "src/interfaces/influx.interface";

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

  async writeData(handleData: BodyHandleData) {
    await Promise.all([
      this.writeSolarpanelData(handleData),
      this.writeAccumulatorData(handleData.userId, handleData.systemId, this.powerToPercentage(handleData.currentPower))
    ]);

    return { message: 'Data written successfully' };
  }

  private async writeSolarpanelData(handleData: BodyHandleData): Promise<void> {
    try {
      const point = new Point('solar_panel')
        .tag('userId', String(handleData.userId))
        .tag('systemId', String(handleData.systemId))
        .floatField('current_power', handleData.currentPower);

      this.writeApi.writePoint(point);

      await this.writeApi.flush();
    } catch (error) {
      throw new InternalServerErrorException('Error solar panel.');
    }
  }

  private async writeAccumulatorData(userId: number, systemId: number, batteryCharge: number): Promise<void> {
    try {
      const point = new Point('accumulator')
        .tag('userId', String(userId))
        .tag('systemId', String(systemId))
        .floatField('battery_charge', batteryCharge)

      this.writeApi.writePoint(point);

      await this.writeApi.flush();
    } catch (error) {
      throw new InternalServerErrorException('Error accumulator.')
    }
  }

  async querySolarpanelRealDataTime(userId: number, systemId: number, bodyFluxQuery: BodyFluxQueryRealTime) {
    try {
      const fluxQuery =
        `from(bucket: "${process.env.INFLUX_BUCKET}")
          |> range(start: 0)
          |> filter(fn: (r) => r._measurement == "${bodyFluxQuery.typeProject}" and r.userId == "${userId}" and r.systemId == "${systemId}")
          |> sort(columns: ["_time"], desc: true)
          |> limit(n: 1)`;

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

  private powerToPercentage(currentPower: number): number {
    if (currentPower === 0) return 0;

    const maxPower = 300;

    return (currentPower / maxPower) * 100;
  }
}
