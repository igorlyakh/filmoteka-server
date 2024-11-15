import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Room } from '@prisma/client';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  addUserToNewRoom(userId: string, room: Room) {
    return this.server.to(userId).emit('addToRoom', room);
  }

  kickUserFromRoom(userId: string, roomId: number) {
    return this.server.to(userId).emit('kickFromRoom', roomId);
  }
}
