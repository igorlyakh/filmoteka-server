import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Room } from '@prisma/client';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    client.send('Check');
    if (token) {
      try {
        const user = this.jwtService.verify(token, {
          secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
        console.log(`Connected user id: ${user.id}`);
        client.join(user.id.toString());
      } catch (error) {
        console.log('err');
      }
    }
  }

  handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = this.jwtService.verify(token, {
          secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        });
        console.log(`Disconnected user id: ${user.id}`);
        client.leave(user.id.toString());
      } catch (error) {
        console.log('err');
      }
    }
  }

  addUserToNewRoom(userId: string, room: Room) {
    return this.server.to(userId).emit('addRoom', room);
  }
}
