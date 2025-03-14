import { Global, Module } from "@nestjs/common";
import { InfluxDBService } from "./influxdb.service";
// import { influxQueryApi, influxWriteApi } from "src/config/influxdb.config";

@Global()
@Module({
  providers: [
    InfluxDBService
    // {
    //   provide: 'INFLUX_WRITE_API',
    //   useValue: influxWriteApi,
    // },
    // {
    //   provide: 'INFLUX_QUERY_API',
    //   useValue: influxQueryApi,
    // },
  ],
  exports: [
    InfluxDBService
    // 'INFLUX_WRITE_API', 'INFLUX_QUERY_API'
  ],
})
export class InfluxDBModule { }
