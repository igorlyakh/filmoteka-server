import { WebSocketGateway } from '@nestjs/websockets';
import { MoviesService } from './movies.service';

@WebSocketGateway()
export class MoviesGateway {
  constructor(private readonly moviesService: MoviesService) {}
}
