import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
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
}
