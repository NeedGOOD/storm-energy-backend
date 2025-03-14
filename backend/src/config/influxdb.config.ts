// import { InfluxDB, QueryApi, WriteApi } from "@influxdata/influxdb-client"

// // console.log('Connecting to InfluxDB...');

// export const influxDBConfig = {
//   url: process.env.INFLUX_URL || 'http://localhost:8086',
//   token: process.env.INFLUX_TOKEN || 'e9ihX-MG-ePpwLPWCfzOd5_PknER8xwopWWZHsnnqKG8qyca5CqPGnTv4UBmM_QkQMz9GKmYSp_yhBWhNlgbTA==',
//   org: process.env.INFLUX_ORG || 'stormenergy',
//   bucket: process.env.INFLUX_BUCKET || 'stormtest',
// };

// export const influxDB = new InfluxDB({
//   url: influxDBConfig.url,
//   token: influxDBConfig.token
// });

// // console.log('Connected to InfluxDB.');

// export const influxWriteApi: WriteApi = influxDB.getWriteApi(influxDBConfig.org, influxDBConfig.bucket);
// export const influxQueryApi: QueryApi = influxDB.getQueryApi(influxDBConfig.org);
