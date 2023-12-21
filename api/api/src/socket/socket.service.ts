import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { Location } from 'src/device/schema/location.schema';
import { SocketEvents } from './events';

@Injectable()
export class SocketService {
  constructor(private socketGateway: SocketGateway) {}

  async newReading(deviceId: string, location: Location, battery?: number) {
    this.socketGateway.sendMessage(SocketEvents.reading, {
      deviceId,
      location,
      battery,
    });
  }
}
