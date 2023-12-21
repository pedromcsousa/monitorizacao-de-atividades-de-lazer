import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketEvents } from './events';

@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    client.join('admin');
  }

  afterInit(server: any) {
    console.log('Socket started: ', server.opts);
  }

  sendMessage(event: SocketEvents, payload: any) {
    this.server.to('admin').emit(event, payload);
  }
}
