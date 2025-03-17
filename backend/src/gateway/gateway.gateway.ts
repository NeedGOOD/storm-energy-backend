import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InfluxDBService } from 'src/influxdb/influxdb.service';
import { Server } from 'socket.io';
import { BodyHandleData } from 'src/interfaces/influx.interface';

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
}
