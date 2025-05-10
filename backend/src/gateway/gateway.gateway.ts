import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InfluxDBService } from 'src/influxdb/influxdb.service';
import { Server } from 'socket.io';
import { BodyFluxQueryRealTime, BodyHandleData } from 'src/interfaces/influx.interface';

@WebSocketGateway()
export class GatewayGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly influxDBService: InfluxDBService) { }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected.');
    });
  }

  @SubscribeMessage('writeData')
  handleMessage(@MessageBody() bodyHandleData: BodyHandleData) {
    console.log(bodyHandleData);

    this.influxDBService.writeData(bodyHandleData);
  }

  @SubscribeMessage('queryRealDataTime')
  async queryRealDataTime(@MessageBody() body: {
    userId: number,
    systemId: number,
    typeProject: BodyFluxQueryRealTime
  }) {
    const data = await this.influxDBService.queryRealDataTime(body.userId, body.systemId, body.typeProject);
    console.log("data", data);

    return data;
  }

  @SubscribeMessage('queryDataByDate')
  async queryDataByDate(@MessageBody() body: {
    userId: number,
    systemId: number,
    typeProject: BodyFluxQueryRealTime,
    startTime: string,
    stopTime: string
  }) {
    const data = await this.influxDBService.queryDataByDate(body.userId, body.systemId, body.typeProject, body.startTime, body.stopTime);
    console.log('Data by date', data);

    return data;
  }
}
