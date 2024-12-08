import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Movie } from '@prisma/client';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
})
export class MovieGateway {
  constructor() {}

  @WebSocketServer()
  server: Server;

  onAddMovie(userId: string[], movie: Movie) {
    return this.server.to(userId).emit('addMovie', movie);
  }

  onDeleteMovie(userId: string[], movieId: number) {
    return this.server.to(userId).emit('deleteMovie', movieId);
  }
}
