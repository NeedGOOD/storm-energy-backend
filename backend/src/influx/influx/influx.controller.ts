import { Body, Controller, Post } from "@nestjs/common";
import { InfluxService } from "./influx.service";

@Controller('influx')
export class InfluxController {
  constructor(
    private readonly influxService: InfluxService,
  ) { }

  @Post()
  create(@Body() data: { topic: string, value: number }) {
    console.log('controller');
    
    return this.influxService.writeMeasurement(data.topic, data.value);
  }
}
